"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Player from "@/components/Player/Player";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchVideo } from "@/redux/slices/videosSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.videoReducer);

  useEffect(() => {
    dispatch(fetchVideo(id));
    console.log(id);
  }, []);

  return (
    <div className="w-full">
      {status === "succeeded" && <Player data={data} />}
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default Page;
