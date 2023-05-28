"use client";

import VideoContainer from "@/components/Video/VideoContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdditionalHomeFeed,
  fetchHomeFeed,
} from "@/redux/slices/homeFeedSlice";
import { useEffect } from "react";
import { Welcome, WelcomeDatum } from "@/types/homeFeedTypes";
import { useBottomReached } from "@/hooks/useBottomReached";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const isBottomReached = useBottomReached();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.homeFeedReducer);

  useEffect(() => {
    dispatch(fetchHomeFeed());
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(fetchAdditionalHomeFeed({ token: data.continuation }));
    }
    console.log(status);
  }, [isBottomReached]);

  return (
    <main className="flex min-h-screen w-full flex-1 flex-col pr-3 pt-3">
      <VideoContainer data={data as any} />
      {status === "loading" && <LoadingSpinner />}
    </main>
  );
}
