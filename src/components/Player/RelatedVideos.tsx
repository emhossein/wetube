import { Datum } from "@/types/relatedVideoTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import formatNumber from "@/utils/numberFormat";

type iProps = {
  relate: Datum;
};

const RelatedVideos = ({ relate }: iProps) => {
  return (
    <Link
      href={`/video/${relate.videoId}`}
      key={relate.videoId}
      className="mt-2 flex"
    >
      <div className="relative mr-2 aspect-video h-full w-40 overflow-hidden rounded-md bg-gray-350">
        <Image
          src={relate.thumbnail[0].url}
          alt={relate.title}
          fill
          className="position-unset"
        />
        <p className="absolute bottom-[3%] right-[3%] rounded-sm bg-black bg-opacity-70 px-1 text-xs">
          {relate.lengthText}
        </p>
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
  );
};

export default RelatedVideos;
