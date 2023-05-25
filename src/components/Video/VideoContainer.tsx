import React from "react";
import Video from "./Video";
import { Welcome, WelcomeDatum } from "@/types/homeFeedTypes";

const VideoContainer = ({ data }: { data: Welcome }) => {
  const videos = data?.data?.filter((item: any) => item.type === "video");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-2">
      {videos?.map((item: WelcomeDatum) => {
        return <Video key={item.videoId} item={item} />;
      })}
    </div>
  );
};

export default VideoContainer;
