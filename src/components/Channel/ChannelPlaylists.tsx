import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ChannelPlayListItem from "./ChannelPlayListItem";
import LoadingSpinner from "../LoadingSpinner";
import { fetchChannelPlaylists } from "@/redux/slices/channelPlayListsSlice";

const ChannelPlaylists = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelPlaylistsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelPlaylists(id));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-1 gap-y-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {data.data.map((dt) => {
          if (dt.type === "playlist") {
            return <ChannelPlayListItem key={dt.playlistId} dt={dt} />;
          }
          if (dt.type === "playlist_listing") {
            const playlist = dt.data?.map((item) => item);
            return playlist!.map((item) => (
              <ChannelPlayListItem key={dt.playlistId} dt={item} />
            ));
          }
        })}
        {status === "loading" && <LoadingSpinner />}
      </div>

      {!data.data.length && <p>No playlist created yet.</p>}
    </>
  );
};

export default ChannelPlaylists;
