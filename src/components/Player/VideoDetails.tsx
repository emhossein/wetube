import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LikeIcon, MoreIcon, ShareIcon, VerifiedIcon } from "../Icons";
import formatNumber from "@/utils/numberFormat";
import dateFormat from "@/utils/dateFormat";
import { Welcome } from "@/types/videoTypes";
import { Welcome as WelcomeChannel } from "@/types/channelDetailsTypes";

type iProps = {
  data: Welcome;
  channel: WelcomeChannel;
};

const VideoDetails = ({ data, channel }: iProps) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mt-3 px-3 md:px-0">
      <h2 className="text-xl font-semibold">{data.result.title}</h2>
      <div className="mt-3 w-full items-center justify-between md:flex">
        <div className="mb-2 flex md:mb-0">
          <Link href={`/channel/${channel?.meta?.channelId}`}>
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={channel?.meta?.avatar?.[0]?.url}
                alt={channel?.meta?.title}
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
              {channel?.meta?.isVerified && <VerifiedIcon />}
            </Link>
            <p className="text-xs text-gray-light">
              {channel?.meta?.subscriberCountText} subscribers
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
          <div className={`${showMore ? "" : "h-20"} overflow-hidden p-3`}>
            <div className="space-x-2 md:flex">
              <div className="flex space-x-2">
                <p>{formatNumber(data.result.view_count)} views</p>
                <p>{dateFormat(data.result.upload_date?.date)}</p>
              </div>
              {data.result.tags?.slice(0, 3).map((tag) => (
                <p key={tag}>#{tag.replace(" ", "-")}</p>
              ))}
            </div>
            <p className="whitespace-pre-line">{data.result.description}</p>
          </div>
        </div>
        <button className="p-3" onClick={handleShowMore}>
          {showMore ? "show less" : "show more"}
        </button>
      </div>
    </div>
  );
};

export default VideoDetails;
