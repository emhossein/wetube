import { Datum } from "@/types/relatedVideoTypes";
import formatNumber from "@/utils/numberFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  );
};

export default RelatedVideos;
