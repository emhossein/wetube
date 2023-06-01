import { useAppSelector } from "@/redux/hooks";
import { Data } from "@/types/channelDetailsTypes";
import formatNumber from "@/utils/numberFormat";
import React from "react";
import { VerifiedIcon } from "../Icons";
import Image from "next/image";

const ChannelItems = ({ dt }: { dt: Data }) => {
  const { data } = useAppSelector((state) => state.channelDetailsReducer);

  return (
    <>
      <div title={dt.title} className="relative rounded-md">
        <Image
          src={dt?.thumbnail?.[dt.thumbnail.length - 1].url}
          alt={dt.title}
          fill
          className={`position-unset | md:rounded-md`}
        />
        <p
          className={`absolute bottom-[3%] right-[3%] rounded-sm ${
            dt.lengthText === "LIVE" ? "bg-red-brand" : "bg-black"
          } bg-opacity-60 px-1 text-xs`}
        >
          {dt.lengthText}
        </p>
      </div>

      <div className="px-2 md:p-0">
        <p
          title={dt.title}
          className="my-2 line-clamp-2 w-4/5 text-sm leading-5"
        >
          {dt.title}
        </p>
        {dt.type === "video" && (
          <>
            <div className="flex space-x-1">
              <p className="text-xs text-gray-light">{data.meta.title}</p>
              {data.meta.isVerified && <VerifiedIcon />}
            </div>
            <p className="text-xs text-gray-light">
              {formatNumber(Number(dt.viewCount))} views •{" "}
              {dt.publishedTimeText ? dt.publishedTimeText : "Live"}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ChannelItems;
