import { DatumDatum, WelcomeDatum } from "@/types/channelDetailsTypes";

import ChannelChannelListing from "./ChannelChannelListing";
import ChannelShortsListing from "./ChannelShortsListing";
import ChannelVideoListing from "./ChannelVideoListing";
import React from "react";

const ChannelHome = ({ data, id }: { data: WelcomeDatum[]; id: string }) => {
  const videos = data?.filter((dt) => dt.type === "video_listing");
  const shorts = data?.filter((dt) => dt.type === "shorts_listing");

  const type = data?.map((dt) => dt?.type);

  return (
    <div>
      {type?.includes("video_listing") && (
        <ChannelVideoListing videos={videos as DatumDatum[]} />
      )}
      {type?.includes("shorts_listing") && (
        <ChannelShortsListing shorts={shorts as DatumDatum[]} />
      )}
      {type?.includes("channel_listing") && <ChannelChannelListing id={id} />}
    </div>
  );
};

export default ChannelHome;
