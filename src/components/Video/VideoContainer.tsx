import React from "react";
import Video from "./Video";
import { DatumDatum, WelcomeDatum } from "@/types/homeFeedTypes";
import Link from "next/link";

const VideoContainer = ({ data }: { data: WelcomeDatum }) => {
  const videos = data?.data?.filter((item: any) => item.type === "video");

  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos?.map((item: DatumDatum) => {
        return (
          <Link key={item.videoId} href={`/video/${item.videoId}`}>
            <Video item={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
