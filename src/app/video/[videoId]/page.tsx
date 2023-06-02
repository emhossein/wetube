"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Player from "@/components/Player/Player";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRelatedVideos } from "@/redux/slices/relatedVideosSlice";
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
  const { showGuide } = useAppSelector((state) => state.guideStateReducer);

  useEffect(() => {
    dispatch(fetchVideo(id));
    dispatch(fetchRelatedVideos(id));
  }, []);

  return (
    <>
      <head>
        <title>{data.result.title}</title>
        <meta property="og:title" content={data.result.title} key="title" />
        <meta name="description" content={data.result.description} />
      </head>
      <div className={`w-full ${showGuide ? "" : "md:px-8"}`}>
        {status === "succeeded" && (
          <Player id={id} related={related} data={data} />
        )}
        {status === "loading" && <LoadingSpinner />}
      </div>
    </>
  );
};

export default Page;
