/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import formatNumber from "./../../utils/numberFormat";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Datum } from "@/types/channelVideosTypes";
import { useAppSelector } from "@/redux/hooks";

const Video = ({ item, dataType }: { item: Datum; dataType?: string }) => {
  const [image] = useState<string | undefined>(
    item?.thumbnail?.[item.thumbnail.length - 1]?.url
  );

  const { data } = useAppSelector((state) => state.channelVideosReducer);

  return (
    <div className="max-w-[360px] hover:cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-gray-350">
        <img
          src={image}
          alt={item.title}
          className="h-fit w-full object-cover"
          width={360}

          // onError={handleImageLoadError}
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
        <div className="right | w-[80%] truncate">
          <p
            id={`content-title-${item.videoId}`}
            className={`mb-1 truncate ${
              dataType ? "text-base" : "text-sm"
            } font-semibold`}
          >
            {item.title}
          </p>

          <ReactTooltip
            anchorSelect={`#content-title-${item.videoId}`}
            content={item.title}
            noArrow
            style={{ zIndex: 20 }}
          />

          {!dataType && (
            <Link href={`/channel/${data.meta.channelId}`}>
              <p className="text-sm leading-8 hover:font-semibold">
                {data.meta.title}
              </p>
            </Link>
          )}
          {dataType ? (
            <p className="text-sm text-gray-light">{item.viewCountText}</p>
          ) : (
            <p className="text-sm">
              {formatNumber(Number(item.viewCount))} views •{" "}
              {item.publishedTimeText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
