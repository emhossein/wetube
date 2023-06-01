import React from "react";
import ChannelVideo from "./ChannelVideo";
import { Datum, Welcome } from "@/types/channelVideosTypes";
import Link from "next/link";

const ChannelVideoContainer = ({
  data,
  dataType,
}: {
  data: Welcome;
  dataType: string;
}) => {
  const videos = data?.data?.filter((item: Datum) => item.type === "video");
  const shorts = data?.data?.filter((item: Datum) => item.type === "shorts");

  const className: string =
    dataType === "shorts"
      ? "grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
      : "grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={className}>
      {(dataType === "video" || "live") &&
        videos?.map((item: Datum) => {
          return (
            <Link key={item.videoId} href={`/video/${item.videoId}`}>
              <ChannelVideo key={item.videoId} item={item} />
            </Link>
          );
        })}
      {dataType === "shorts" &&
        shorts?.map((item: Datum) => {
          return (
            <Link key={item.videoId} href={`/video/${item.videoId}`}>
              <ChannelVideo
                dataType={dataType}
                key={item.videoId}
                item={item}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default ChannelVideoContainer;
