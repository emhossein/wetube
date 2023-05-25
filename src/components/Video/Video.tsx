/* eslint-disable @next/next/no-img-element */

import React from "react";
import formatNumber from "./../../utils/numberFormat";
import { formatDistance, parseISO } from "date-fns";
import { WelcomeDatum } from "@/types/homeFeedTypes";
import Image from "next/image";
import Link from "next/link";

const Video = ({ item }: { item: WelcomeDatum }) => {
  const targetDate = parseISO("2023-04-24 14:02:32.000000");
  const timeDistance = formatDistance(targetDate, new Date(), {
    addSuffix: true,
  });

  return (
    <div className="max-w-[360px] hover:cursor-pointer">
      <div className="relative bg-gray-350 rounded-xl overflow-hidden">
        <img
          src={item?.thumbnail?.[0]?.url}
          alt={item.title}
          className="w-full h-[203px] object-cover"
        />
        <p className="absolute bg-black bg-opacity-60 bottom-[2%] right-[2%] text-white text-xs px-1 rounded-sm">
          {item.lengthText}
        </p>
      </div>
      <div className="flex mt-3 text-white">
        <Link href={`/channel/${item.channelId}`}>
          <img
            src={item?.channelThumbnail?.[0]?.url}
            alt="Juxtopposed-avatar"
            className="left | w-9 h-9 rounded-full mr-3"
          />
        </Link>
        <div className="right | truncate">
          <p className="truncate text-base font-semibold mb-1">{item.title}</p>
          <Link href={`/channel/${item.channelId}`}>
            <p className="text-sm leading-8 hover:font-semibold">
              {item.channelTitle}
            </p>
          </Link>
          <p className="text-sm">
            {formatNumber(Number(item.viewCount))} •{" "}
            {timeDistance.replace("about", "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
