"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Player from "@/components/Player/Player";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { fetchRelatedVideos } from "@/redux/slices/relatedVideosSlice";
import { fetchVideoComments } from "@/redux/slices/videoCommentsSlice";
import { fetchVideo } from "@/redux/slices/videosSlice";
// import Head from "next/head"; // does not work
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.videoReducer);
  const { data: related } = useAppSelector(
    (state) => state.relatedVideosReducer
  );
  const { data: channel } = useAppSelector(
    (state) => state.channelDetailsReducer
  );
  const { showGuide } = useAppSelector((state) => state.guideStateReducer);

  useEffect(() => {
    dispatch(fetchVideo(id));
    dispatch(fetchRelatedVideos(id));
    dispatch(fetchChannelDetails(data.result.channel_id));
    dispatch(fetchVideoComments(id));
  }, []);

  return (
    <>
      <head>
        <title>{data?.result?.title} - VisionTube</title>
        <meta property="og:title" content={data?.result?.title} key="title" />
        <meta name="description" content={data?.result?.description} />
      </head>
      <div className={`w-full overflow-x-hidden ${showGuide ? "" : "md:px-8"}`}>
        <>
          {data.status === 500 && (
            <h1 className="text-2xl text-white">
              Sorry, Live videos are not provided by the Api.
            </h1>
          )}
          {status === "succeeded" && data.status === 200 && (
            <Player id={id} related={related} channel={channel} data={data} />
          )}
          {status === "loading" && <LoadingSpinner />}
        </>
      </div>
    </>
  );
};

export default Page;
