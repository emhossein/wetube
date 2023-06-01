import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelPlaylists } from "@/redux/slices/channelPlayListsSlice";
import React, { useEffect } from "react";

import ChannelPlayListItem from "./ChannelPlayListItem";
import LoadingSpinner from "../LoadingSpinner";

const ChannelPlaylists = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelPlaylistsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelPlaylists(id));
  }, []);

  const playlists = data.data.filter((dt) => dt.type === "playlist");

  return (
    <>
      <div className="grid grid-cols-1 gap-x-1 gap-y-10 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {playlists.map((dt) => {
          return <ChannelPlayListItem key={dt.playlistId} dt={dt} />;
        })}
        {status === "loading" && <LoadingSpinner />}
      </div>

      {!playlists.length && <p>No playlist created yet.</p>}
    </>
  );
};

export default ChannelPlaylists;
