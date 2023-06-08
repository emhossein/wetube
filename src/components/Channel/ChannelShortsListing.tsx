import ChannelList from "./ChannelList";
import { DatumDatum } from "@/types/channelDetailsTypes";
import React from "react";

const ChannelShortsListing = ({ shorts }: { shorts: DatumDatum[] }) => {
  return (
    <div className="text-white">
      {shorts.map((short) => {
        return (
          <ChannelList dtType="shorts" video={short} key={short.videoId} />
        );
      })}
    </div>
  );
};

export default ChannelShortsListing;
