"use client";

import PlaylistHome from "@/components/Playlists/PlaylistHome";
import { useBottomReached } from "@/hooks/useBottomReached";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdditionalPlaylistDetails,
  fetchPlaylistDetails,
} from "@/redux/slices/playlistDetailsSlice";
// import Head from "next/head"; //does not work
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Playlist = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const isBottomReached = useBottomReached();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.playlistDetailsReducer);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(id));
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(
        fetchAdditionalPlaylistDetails({ id, token: data.continuation })
      );
    }
  }, [isBottomReached]);

  return (
    <>
      <head>
        <title>{data?.meta?.title} - VisionTube</title>
        <meta property="og:title" content={data?.meta?.title} key="title" />
        <meta name="description" content={data?.meta?.title} />
      </head>
      <PlaylistHome />;
    </>
  );
};

export default Playlist;
