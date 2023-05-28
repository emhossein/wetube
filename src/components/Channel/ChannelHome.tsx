import { DatumDatum, WelcomeDatum } from "@/types/channelDetailsTypes";
import React from "react";
import ChannelVideoListing from "./ChannelVideoListing";
import ChannelChannelListing from "./ChannelChannelListing";
import ChannelShortsListing from "./ChannelShortsListing";

const ChannelHome = ({ data }: { data: WelcomeDatum[] }) => {
  const videos = data.filter((dt) => dt.type === "video_listing");
  const channels = data.filter((dt) => dt.type === "channel_listing");
  const shorts = data.filter((dt) => dt.type === "shorts_listing");
  const player = data.filter((dt) => dt.type === "player");

  const type = data.map((dt) => dt.type);

  return (
    <div>
      {type.includes("video_listing") && (
        <ChannelVideoListing videos={videos as DatumDatum[]} />
      )}
      {type.includes("shorts_listing") && (
        <ChannelShortsListing shorts={shorts as DatumDatum[]} />
      )}
      {type.includes("channel_listing") && (
        <ChannelChannelListing channels={channels} />
      )}
    </div>
  );
};

export default ChannelHome;
