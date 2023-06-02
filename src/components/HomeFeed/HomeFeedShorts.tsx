/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DatumDatum } from "@/types/homeFeedTypes";
import formatNumber from "@/utils/numberFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeFeedShorts = ({
  short,
  dtType,
}: {
  short: DatumDatum;
  dtType?: "shorts" | "video";
}) => {
  const className =
    dtType === "shorts"
      ? "w-1/4 flex-none md:w-1/6 lg:w-1/12"
      : "w-full flex-none md:w-1/4 lg:w-1/8";

  return (
    <Link
      href={`/${dtType === "shorts" ? "shorts" : "video"}/${short.videoId}`}
      className={className}
    >
      <div className="relative w-full object-cover md:rounded-lg">
        <Image
          alt={short.title}
          src={short.thumbnail[0].url}
          fill
          className={`position-unset | h-full object-cover ${
            dtType === "shorts" ? "rounded-lg" : "md:rounded-lg"
          }`}
        />

        <p className="absolute bottom-[4%] right-[2%] rounded-sm bg-black bg-opacity-60 px-1 text-xs text-white">
          {short.lengthText}
        </p>
      </div>
      {dtType === "shorts" ? (
        <h2
          title={short.title}
          className="line-clamp-2 w-4/5 overflow-hidden text-sm"
        >
          {short.title}
        </h2>
      ) : (
        <div className="mt-3 flex px-2 md:px-0">
          <div className="left | mr-3 h-9 w-9 overflow-hidden rounded-full">
            <Image
              fill
              src={short.channelThumbnail?.[0].url}
              alt={short.channelTitle!}
              className="position-unset | h-9 w-9"
            />
          </div>
          <div className="right | w-4/5 truncate">
            <h3
              title={short.title}
              className="mb-1 truncate text-base font-semibold"
            >
              {short.title}
            </h3>
            <Link
              className="text-sm leading-8 hover:font-semibold"
              href={`/channel/${short.channelId}`}
            >
              {short.channelTitle}
            </Link>
            <p className="text-sm">
              {formatNumber(Number(short.viewCount))} views •{" "}
              {short.publishedTimeText}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default HomeFeedShorts;
