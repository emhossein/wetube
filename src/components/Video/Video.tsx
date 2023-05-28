/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import formatNumber from "./../../utils/numberFormat";
import { DatumDatum } from "@/types/homeFeedTypes";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";

import placeholderImage from "/public/placeholder.webp";

const Video = ({ item }: { item: DatumDatum }) => {
  const [image, setImage] = useState<string | undefined | StaticImageData>(
    item?.thumbnail?.[0]?.url
  );

  const handleImageLoadError = () => {
    setImage(placeholderImage);
  };

  return (
    <div className="max-w-[360px] hover:cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-gray-350">
        <Image
          src={image || placeholderImage}
          alt={item.title}
          className="h-[203px] w-full object-cover"
          width={360}
          height={203}
          onError={handleImageLoadError}
        />
        <p
          className={`absolute ${
            item.lengthText === "LIVE" ? "bg-red-brand" : "bg-black"
          } bottom-[4%] right-[2%] rounded-sm bg-opacity-60 px-1 text-xs text-white`}
        >
          {item.lengthText}
        </p>
      </div>
      <div className="mt-3 flex text-white">
        <Link href={`/channel/${item.channelId}`}>
          <img
            src={item?.channelThumbnail?.[0]?.url}
            alt={item.title}
            className="left | mr-3 h-9 w-9 rounded-full"
          />
        </Link>
        <div className="right | w-[80%] truncate">
          <p
            id={`content-title-${item.videoId}`}
            className="mb-1 truncate text-base font-semibold"
          >
            {item.title}
          </p>
          <ReactTooltip
            anchorSelect={`#content-title-${item.videoId}`}
            content={item.title}
            noArrow
            style={{ zIndex: 20 }}
          />
          <Link href={`/channel/${item.channelId}`}>
            <p className="text-sm leading-8 hover:font-semibold">
              {item.channelTitle}
            </p>
          </Link>
          <p className="text-sm">
            {formatNumber(Number(item.viewCount))} views •{" "}
            {item.publishedTimeText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
