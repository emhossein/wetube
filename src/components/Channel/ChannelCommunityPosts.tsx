import { CommentIcon, LikeIcon } from "../Icons";
import React, { useEffect } from "react";
import {
  fetchAdditionalChannelCommunity,
  fetchChannelCommunity,
} from "@/redux/slices/channelCommunitySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import extractUrlAndHashtags from "@/utils/extractUrlAndHashtags";
import { useBottomReached } from "@/hooks/useBottomReached";

const ChannelCommunityPosts = ({ id }: { id: string }) => {
  const isBottomReached = useBottomReached();

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelCommunityReducer
  );

  useEffect(() => {
    dispatch(fetchChannelCommunity(id));
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(
        fetchAdditionalChannelCommunity({ token: data.continuation, id })
      );
    }
  }, [isBottomReached]);

  return (
    <div className="w-full shrink-0 md:max-w-[850px]">
      {data.data.map((dt) => {
        return (
          <div
            key={dt.postId}
            className="mt-6 flex space-x-2 border-y border-gray-350 bg-gray-350 p-4 pb-2 text-white md:rounded-md md:border md:bg-transparent"
          >
            <Link
              href={`/channel/${dt.authorChannelId}`}
              className="h-10 w-10 shrink-0"
            >
              <Image
                fill
                src={`https:${dt.authorThumbnail[0].url}`}
                alt={dt.authorText}
                className="position-unset | mr-4 rounded-full "
              />
            </Link>

            <div className="h-full">
              <div className="mb-px flex space-x-3">
                <p className="text-sm">{dt.authorText}</p>
                <p className="text-xs text-gray-light">
                  {dt.publishedTimeText}
                </p>
              </div>
              <p
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: extractUrlAndHashtags(dt.contentText),
                }}
              />
              {dt.attachment?.type === "image" && (
                <Image
                  fill
                  src={
                    dt?.attachment?.image?.[dt?.attachment?.image.length - 1]
                      .url
                  }
                  alt={dt.attachment.type}
                  className="position-unset | mt-4 rounded-md"
                />
              )}
              {dt.attachment?.type === "multi_image" && (
                <div className="flex w-full space-x-1">
                  <div className="mt-4 w-1/2 rounded-md">
                    <Image
                      fill
                      src={
                        dt?.attachment?.image?.[0][
                          dt?.attachment?.image?.[0].length - 1
                        ].url
                      }
                      alt={dt.attachment.type}
                      className="position-unset | rounded-md"
                    />
                  </div>
                  <div className="mt-4 w-1/2 rounded-md">
                    <Image
                      fill
                      src={
                        dt?.attachment?.image?.[1][
                          dt?.attachment?.image?.[1].length - 1
                        ].url
                      }
                      alt={dt.attachment.type}
                      className="position-unset | rounded-md"
                    />
                  </div>
                </div>
              )}
              {dt.attachment?.type === "poll" && (
                <div>
                  <p className="mt-1 text-xs text-gray-light">
                    {dt.attachment.totalVotes}
                  </p>
                  <form className="space-y-3 pt-3">
                    {dt.attachment.choices?.map((choice, index) => (
                      <div key={choice}>
                        <label
                          htmlFor={`${choice.replace(
                            /[^\w\s]/gi,
                            ""
                          )}-${index}`}
                          className="flex"
                        >
                          <input
                            type="radio"
                            id={`${choice.replace(/[^\w\s]/gi, "")}-${index}`}
                            name="choices"
                            value={choice}
                            className="hover:cursor-pointer"
                          />
                          <p className="ml-3 flex h-10 w-full items-center rounded-md border border-gray-light p-2 hover:cursor-pointer">
                            {choice}
                          </p>
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              )}
              <div className="buttons | mt-1 flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <LikeIcon />
                  <p className="text-xs text-gray-light">{dt.voteCountText}</p>
                </div>
                <div className="rotate-180">
                  <LikeIcon />
                </div>
                <div className="flex items-center space-x-1">
                  <CommentIcon />
                  <p className="text-xs text-gray-light">{dt.replyCount}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default ChannelCommunityPosts;
