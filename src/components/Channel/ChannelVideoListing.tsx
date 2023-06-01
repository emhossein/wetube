import { DatumDatum } from "@/types/channelDetailsTypes";
import React from "react";
import ChannelList from "./ChannelList";

const ChannelVideoListing = ({ videos }: { videos: DatumDatum[] }) => {
  return (
    <div className="text-white">
      {videos.map((video) => {
        return <ChannelList key={video.videoId} video={video} />;
      })}
    </div>
  );
};

export default ChannelVideoListing;
