import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { Welcome } from "@/types/videoTypes";
import { Welcome as WelcomeRelated } from "@/types/relatedVideoTypes";
import bitsToMegabytes from "@/utils/bitsToMegaBytes";
import dateFormat from "@/utils/dateFormat";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LikeIcon, MoreIcon, ShareIcon, VerifiedIcon } from "../Icons";
import formatNumber from "@/utils/numberFormat";
import { fetchAdditionalRelatedVideos } from "@/redux/slices/relatedVideosSlice";
import VisibilitySensor from "react-visibility-sensor";
import LoadingSpinner from "../LoadingSpinner";

type iProps = {
  data: Welcome;
  related: WelcomeRelated;
  id: string;
};

const Player = ({ data, related, id }: iProps) => {
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const mp4 = data?.result?.formats?.filter(
    (format) => format.format === "18 - 640x360 (360p)"
  );

  const dispatch = useAppDispatch();
  const { data: channel } = useAppSelector(
    (state) => state.channelDetailsReducer
  );

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleVisibilityChange = (index: number, isVisible: boolean) => {
    if (index === related.data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  useEffect(() => {
    if (channel.data.length === 0) {
      dispatch(fetchChannelDetails(data.result.channel_id));
    }
  }, []);

  useEffect(() => {
    if (isLastItemVisible && related.continuation) {
      dispatch(
        fetchAdditionalRelatedVideos({ id, token: related.continuation })
      );
      setLoading(true);
    }

    if (!isLastItemVisible) {
      setLoading(false);
    }
  }, [isLastItemVisible]);

  return (
    <div className="grid w-full text-white lg:grid-cols-4">
      {mp4 && (
        <div className="relative col-span-3 w-full">
          <video
            src={mp4[0].url}
            controls
            className="aspect-video w-full hover:cursor-pointer"
            poster={data.result.thumbnail}
          >
            Your browser does not support HTML5 video.
          </video>
          <div className="mt-3 px-3 md:px-0">
            <h2 className="text-xl font-semibold">{data.result.title}</h2>
            <div className="mt-3 w-full items-center justify-between md:flex">
              <div className="mb-2 flex md:mb-0">
                <Link href={`/channel/${channel.meta.channelId}`}>
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={channel?.meta?.avatar?.[0]?.url}
                      alt={channel.meta.title}
                      fill
                      className="position-unset"
                    />
                  </div>
                </Link>
                <div>
                  <Link
                    className="flex items-center space-x-1 text-sm"
                    href={`/channel/${data.result.channel_id}`}
                  >
                    <p>{data.result.channel}</p>
                    {channel.meta.isVerified && <VerifiedIcon />}
                  </Link>
                  <p className="text-xs text-gray-light">
                    {channel.meta.subscriberCountText} subscribers
                  </p>
                </div>
              </div>
              <div className="flex h-9 space-x-2">
                <div className="flex items-center space-x-2 rounded-3xl bg-gray-350 px-4 hover:bg-[#3F3F3F]">
                  <button className="flex space-x-1">
                    <LikeIcon />
                    <p>{formatNumber(data.result.like_count)}</p>
                  </button>
                  <div className="h-[80%] w-px bg-gray-light" />
                  <button className="rotate-180">
                    <LikeIcon />
                  </button>
                </div>
                <div className="flex items-center space-x-3 rounded-3xl bg-gray-350 px-4 hover:bg-[#3F3F3F]">
                  <button className="flex space-x-1">
                    <ShareIcon />
                    <p>Share</p>
                  </button>
                </div>
                <div className="center w-9 space-x-3 rounded-3xl bg-gray-350 hover:bg-[#3F3F3F]">
                  <button className="flex rotate-90 space-x-1">
                    <MoreIcon />
                  </button>
                </div>
              </div>
            </div>

            <div
              onClick={() => !showMore && handleShowMore()}
              className={`relative mt-3 w-full rounded-lg bg-gray-350 text-sm ${
                !showMore && "hover:cursor-pointer hover:bg-[#3F3F3F]"
              }`}
            >
              <div className="relative">
                <div
                  className={`${showMore ? "" : "h-20"} overflow-hidden p-3`}
                >
                  <div className="space-x-2 md:flex">
                    <div className="flex space-x-2">
                      <p>{formatNumber(data.result.view_count)} views</p>
                      <p>{dateFormat(data.result.upload_date?.date)}</p>
                    </div>
                    {data.result.tags?.slice(0, 3).map((tag) => (
                      <p key={tag}>#{tag.replace(" ", "-")}</p>
                    ))}
                  </div>
                  <p className="whitespace-pre-line">
                    {data.result.description}
                  </p>
                </div>
              </div>
              <button className="p-3" onClick={handleShowMore}>
                {showMore ? "show less" : "show more"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="col-span-1 ml-2 w-full p-3">
        {related.data.map((relate, index) => {
          return (
            <VisibilitySensor
              onChange={(isVisible: boolean) =>
                handleVisibilityChange(index, isVisible)
              }
              partialVisibility
              offset={{ right: 1 }}
              key={relate.videoId}
            >
              <Link
                href={`/video/${relate.videoId}`}
                key={relate.videoId}
                className="mt-2 flex"
              >
                <div className="mr-2 h-full w-40 overflow-hidden rounded-md">
                  <Image
                    src={relate.thumbnail[0].url}
                    alt={relate.title}
                    fill
                    className="position-unset"
                  />
                </div>
                <div className="w-2/3 pr-6">
                  <p className="mb-1 line-clamp-2 text-sm">{relate.title}</p>
                  <Link
                    href={`/channel/${relate.channelId}`}
                    className="text-xs text-gray-light hover:text-white"
                  >
                    {relate.channelTitle}
                  </Link>
                  <p className="line-clamp-2 text-xs text-gray-light">
                    {formatNumber(Number(relate.viewCount))} views •{" "}
                    {relate.publishedTimeText}
                  </p>
                </div>
              </Link>
            </VisibilitySensor>
          );
        })}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Player;
