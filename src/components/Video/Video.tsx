/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react";
import formatNumber from "./../../utils/numberFormat";
import { DatumDatum } from "@/types/homeFeedTypes";
import Link from "next/link";
import Image from "next/image";

const Video = ({ item }: { item: DatumDatum }) => {
  return (
    <div className="w-full hover:cursor-pointer">
      <div className="relative overflow-hidden bg-gray-350 md:rounded-xl">
        <div className="w-full object-cover">
          <Image
            src={item?.thumbnail?.[0]?.url}
            alt={item.title}
            className="position-unset | h-full w-full object-cover"
            fill
          />
        </div>
        <p
          className={`absolute ${
            item.lengthText === "LIVE" ? "bg-red-brand" : "bg-black"
          } bottom-[4%] right-[2%] rounded-sm bg-opacity-60 px-1 text-xs text-white`}
        >
          {item.lengthText}
        </p>
      </div>
      <div className="mt-3 flex px-2 text-white md:px-0">
        <Link
          href={`/channel/${item.channelId}`}
          className="left| mr-3 h-9 w-9 rounded-full"
        >
          <Image
            fill
            src={item!.channelThumbnail![0].url!}
            alt={item.title}
            className="position-unset | rounded-full"
          />
        </Link>
        <div className="right | w-[80%] truncate">
          <p
            title={item.title}
            className="mb-1 truncate text-base font-semibold"
          >
            {item.title}
          </p>

          <Link href={`/channel/${item.channelId}`}>
            <p className="text-sm leading-8 hover:font-semibold">
              {item.channelTitle}
            </p>
          </Link>
          <p className="text-sm">
            {formatNumber(Number(item.viewCount))} views
            {item.publishedTimeText
              ? " • " + item.publishedTimeText
              : " • LIVE"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
