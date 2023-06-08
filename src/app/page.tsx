/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  fetchAdditionalHomeFeed,
  fetchHomeFeed,
} from "@/redux/slices/homeFeedSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import HomeFeedShortsListing from "@/components/HomeFeed/HomeFeedShortsListing";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoContainer from "@/components/Video/VideoContainer";
import { useBottomReached } from "@/hooks/useBottomReached";
import { useEffect } from "react";

export default function Home() {
  const isBottomReached = useBottomReached();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.homeFeedReducer);
  const { showGuide } = useAppSelector((state) => state.guideStateReducer);

  const shorts = data.data.filter((dt) => dt.type === "shorts_listing");
  const videos = data.data.filter((dt) => dt.type === "video_listing");

  useEffect(() => {
    dispatch(fetchHomeFeed());
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(fetchAdditionalHomeFeed({ token: data.continuation }));
    }
  }, [isBottomReached]);

  return (
    <main
      className={`flex min-h-screen w-4/5 flex-1 flex-col pt-3 ${
        showGuide ? "md:pr-3" : "md:px-10"
      }`}
    >
      {shorts.length && (
        <HomeFeedShortsListing dtType="shorts" shorts={shorts} />
      )}
      {videos.length && (
        <HomeFeedShortsListing dtType="video" shorts={videos} />
      )}
      <VideoContainer data={data as any} />
      {status === "loading" && <LoadingSpinner />}
    </main>
  );
}
