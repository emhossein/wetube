/* eslint-disable @next/next/no-img-element */
import { DatumDatum } from "@/types/channelDetailsTypes";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import ChannelList from "./ChannelList";

const ChannelShortsListing = ({ shorts }: { shorts: DatumDatum[] }) => {
  const { data } = useAppSelector((state) => state.channelDetailsReducer);

  return (
    <div className="text-white">
      {shorts.map((short) => {
        return <ChannelList video={short} key={short.videoId} />;
      })}
    </div>
  );
};

export default ChannelShortsListing;
