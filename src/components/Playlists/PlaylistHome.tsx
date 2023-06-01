import React from "react";
import { useAppSelector } from "@/redux/hooks";
import PlaylistCard from "./PlaylistCard";
import LoadingSpinner from "../LoadingSpinner";
import PlaylistItem from "./PlaylistItem";

const PlaylistHome = () => {
  const { data, status } = useAppSelector(
    (state) => state.playlistDetailsReducer
  );

  return (
    <div className="flex w-full flex-col text-white md:flex-row">
      <PlaylistCard />
      <div className="mb-8 ml-1 mr-6 w-full">
        {data.data.map((dt) => {
          return <PlaylistItem dt={dt} key={dt.videoId} />;
        })}
        {status === "loading" && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default PlaylistHome;
