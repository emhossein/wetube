"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import LoadingSpinner from "@/components/LoadingSpinner";
import Player from "@/components/Player/Player";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { fetchRelatedVideos } from "@/redux/slices/relatedVideosSlice";
import { fetchVideo } from "@/redux/slices/videosSlice";
import { fetchVideoComments } from "@/redux/slices/videoCommentsSlice";
import { usePathname } from "next/navigation";

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
    dispatch(fetchVideoComments(id));
  }, []);

  return (
    <>
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
