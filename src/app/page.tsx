"use client";

import VideoContainer from "@/components/Video/VideoContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchHomeFeed } from "@/redux/slices/homeFeedSlice";
import { useEffect } from "react";
import { HomeFeedState, Welcome, WelcomeDatum } from "@/types/homeFeedTypes";

export default function Home() {
  const dispatch = useAppDispatch();
  const { data }: HomeFeedState = useAppSelector(
    (state) => state.homeFeedReducer
  );

  useEffect(() => {
    if (!data) {
      dispatch(fetchHomeFeed());
    }
    // console.log(data);
  }, []);

  return (
    <main className="flex flex-1 w-full min-h-screen flex-col pt-3">
      <VideoContainer data={data as WelcomeDatum[]} />
    </main>
  );
}
