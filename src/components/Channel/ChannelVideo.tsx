import { Datum } from "@/types/channelVideosTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import formatNumber from "./../../utils/numberFormat";
import { useAppSelector } from "@/redux/hooks";

const Video = ({ item, dataType }: { item: Datum; dataType?: string }) => {
  const { data } = useAppSelector((state) => state.channelVideosReducer);

  return (
    <div className="w-full hover:cursor-pointer md:max-w-[360px]">
      <div
        className={`relative ${
          dataType === "shorts" && "h-52 md:h-72 lg:h-80"
        } overflow-hidden bg-gray-350 md:rounded-xl`}
      >
        <div
          className={`${
            dataType === "shorts" ? "aspect-[9/16]" : "aspect-video"
          } w-full object-cover`}
        >
          <Image
            fill
            src={item?.thumbnail?.[item.thumbnail.length - 1]?.url}
            alt={item.title}
            className="position-unset"
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
      <div className="mt-3 flex text-white">
        <div className="right | w-[80%] truncate px-2 md:px-0">
          <p
            title={item.title}
            className={`mb-1 truncate ${
              dataType ? "text-base" : "text-sm"
            } font-semibold`}
          >
            {item.title}
          </p>

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
