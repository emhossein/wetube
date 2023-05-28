/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/redux/hooks";
import { Data } from "@/types/channelDetailsTypes";
import formatNumber from "@/utils/numberFormat";
import React, { useState } from "react";
import { VerifiedIcon } from "../Icons";

const ChannelItems = ({ dt }: { dt: Data }) => {
  const [dimension, setDimension] = useState("h-fit w-full");

  const { data } = useAppSelector((state) => state.channelDetailsReducer);

  return (
    <>
      <div className="relative rounded-md">
        <img
          src={dt?.thumbnail?.[dt.thumbnail.length - 1].url}
          alt={dt.title}
          className={`${dimension} rounded-md`}
          onError={() => setDimension("w-[250px] h-[140px] bg-gray-350")}
        />
        <p
          className={`absolute bottom-[3%] right-[3%] rounded-sm ${
            dt.lengthText === "LIVE" ? "bg-red-brand" : "bg-black"
          } bg-opacity-60 px-1 text-xs`}
        >
          {dt.lengthText}
        </p>
      </div>

      <p className="my-2 line-clamp-2 w-4/5 text-sm leading-5">{dt.title}</p>
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
    </>
  );
};

export default ChannelItems;
