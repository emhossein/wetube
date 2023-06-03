import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAdditionalVideoComments } from "@/redux/slices/videoCommentsSlice";
import React, { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import LoadingSpinner from "../LoadingSpinner";
import { CloseIcon, CommentIcon, LikeIcon } from "../Icons";
import Image from "next/image";
import Link from "next/link";

const VideoComments = () => {
  const [loading, setLoading] = useState(false);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.videoReducer);
  const { data: comments } = useAppSelector(
    (state) => state.videoCommentsReducer
  );

  const firstComment = comments.data[0];

  const handleVisibilityChange = (isVisible: boolean, index: number) => {
    if (index === comments.data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  const handleShowComments = () => {
    setShowComment(!showComment);
  };

  useEffect(() => {
    if (isLastItemVisible && comments.continuation) {
      dispatch(
        fetchAdditionalVideoComments({
          id: data.result.id,
          token: comments.continuation,
        })
      );
      setLoading(true);
    }

    if (!isLastItemVisible) {
      setLoading(false);
    }
  }, [isLastItemVisible]);

  return (
    <div className="mt-3 px-3 md:px-0">
      <h1 className="my-6 hidden text-lg lg:block">
        {comments.commentsCount} Comments
      </h1>

      {/* for mobile */}
      <div
        onClick={handleShowComments}
        className="block rounded-md bg-gray-350 p-4 text-white  hover:bg-[#3F3F3F] lg:hidden"
      >
        <h1 className="block text-sm text-gray-light">
          {comments.commentsCount} Comments
        </h1>
        <div className="mt-1 flex items-center space-x-2">
          <div className="h-7 w-7 shrink-0">
            <Image
              fill
              src={firstComment?.authorThumbnail[0].url}
              alt={firstComment?.authorChannelId}
              className="position-unset | mr-4 rounded-full "
            />
          </div>

          <div className="h-full">
            <p className="text-sm md:text-base">{firstComment?.textDisplay}</p>
          </div>
        </div>
      </div>
      {showComment && (
        <div
          className="fixed left-0 top-[40vh] z-10 block h-full w-full overflow-y-scroll rounded-t-lg bg-gray-350 pb-[40vh] transition-transform duration-100 ease-in-out lg:hidden"
          style={{ transform: `translateY(${showComment ? 0 : 100}%)` }}
        >
          <div
            onClick={handleShowComments}
            className="flex w-full items-center justify-end px-4 pt-3 hover:cursor-pointer"
          >
            <CloseIcon />
          </div>
          {comments.data.map((cmt, index) => {
            return (
              <VisibilitySensor
                onChange={(isVisible: boolean) =>
                  handleVisibilityChange(isVisible, index)
                }
                partialVisibility
                offset={{ bottom: 1 }}
                key={cmt.commentId}
              >
                <div className="mt-1 flex space-x-2 rounded-md p-4 pb-2 text-white md:mt-6">
                  <Link
                    href={`/channel/${cmt.authorChannelId}`}
                    className="h-10 w-10 shrink-0"
                  >
                    <Image
                      fill
                      src={cmt.authorThumbnail[0].url}
                      alt={cmt.authorChannelId}
                      className="position-unset | mr-4 rounded-full "
                    />
                  </Link>

                  <div className="h-full">
                    <div className="mb-px flex space-x-3">
                      <p className="text-xs md:text-sm">{cmt.authorText}</p>
                      <p className="text-[10px] text-gray-light md:text-xs">
                        {cmt.publishedTimeText}
                      </p>
                    </div>
                    <p className="text-sm md:text-base">{cmt.textDisplay}</p>

                    <div className="buttons | mt-1 flex items-center space-x-3">
                      <button className="flex items-center space-x-1">
                        <LikeIcon />
                        <p className="text-xs text-gray-light">
                          {cmt.likesCount}
                        </p>
                      </button>
                      <button className="rotate-180">
                        <LikeIcon />
                      </button>
                      <button className="text-xs md:text-sm">
                        <CommentIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </VisibilitySensor>
            );
          })}
        </div>
      )}

      {/* for desktop */}
      <div className="hidden lg:block">
        {comments.data.map((cmt, index) => {
          return (
            <VisibilitySensor
              onChange={(isVisible: boolean) =>
                handleVisibilityChange(isVisible, index)
              }
              partialVisibility
              offset={{ bottom: 1 }}
              key={cmt.commentId}
            >
              <div className="mt-1 flex space-x-2 rounded-md p-4 pb-2 text-white md:mt-6">
                <Link
                  href={`/channel/${cmt.authorChannelId}`}
                  className="h-10 w-10 shrink-0"
                >
                  <Image
                    fill
                    src={cmt.authorThumbnail[0].url}
                    alt={cmt.authorChannelId}
                    className="position-unset | mr-4 rounded-full "
                  />
                </Link>

                <div className="h-full">
                  <div className="mb-px flex space-x-3">
                    <p className="text-xs md:text-sm">{cmt.authorText}</p>
                    <p className="text-[10px] text-gray-light md:text-xs">
                      {cmt.publishedTimeText}
                    </p>
                  </div>
                  <p className="text-sm md:text-base">{cmt.textDisplay}</p>

                  <div className="buttons | mt-1 flex items-center space-x-3">
                    <button className="flex items-center space-x-1">
                      <LikeIcon />
                      <p className="text-xs text-gray-light">
                        {cmt.likesCount}
                      </p>
                    </button>
                    <button className="rotate-180">
                      <LikeIcon />
                    </button>
                    <button className="text-xs md:text-sm">Reply</button>
                  </div>
                </div>
              </div>
            </VisibilitySensor>
          );
        })}
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default VideoComments;
