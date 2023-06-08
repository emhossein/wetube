/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import {
  fetchAdditionalPlaylistDetails,
  fetchPlaylistDetails,
} from "@/redux/slices/playlistDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import PlaylistHome from "@/components/Playlists/PlaylistHome";
import { useBottomReached } from "@/hooks/useBottomReached";
import { usePathname } from "next/navigation";

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
      <PlaylistHome />;
    </>
  );
};

export default Playlist;
