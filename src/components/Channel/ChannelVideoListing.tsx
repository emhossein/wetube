/* eslint-disable @next/next/no-img-element */
import { DatumDatum } from "@/types/channelDetailsTypes";
import React, { useState } from "react";
import { VerifiedIcon } from "../Icons";
import { useAppSelector } from "@/redux/hooks";
import formatNumber from "@/utils/numberFormat";
import Link from "next/link";
import ChannelItems from "./ChannelItems";
import ChannelList from "./ChannelList";

const ChannelVideoListing = ({ videos }: { videos: DatumDatum[] }) => {
  const [dimension, setDimension] = useState("h-fit w-full");

  const { data } = useAppSelector((state) => state.channelDetailsReducer);

  return (
    <div className="text-white">
      {videos.map((video) => {
        return <ChannelList key={video.videoId} video={video} />;
      })}
    </div>
  );
};

export default ChannelVideoListing;
