import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdditionalChannelVideos,
  fetchChannelVideos,
} from "@/redux/slices/channelVideosSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import ChannelVideoContainer from "./ChannelVideoContainer";
import { useBottomReached } from "@/hooks/useBottomReached";
import LoadingSpinner from "../LoadingSpinner";

const ChannelVideos = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelVideosReducer
  );

  const isBottomReached = useBottomReached();

  useEffect(() => {
    dispatch(fetchChannelVideos(id));
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(fetchAdditionalChannelVideos({ id, token: data.continuation }));
    }
  }, [isBottomReached]);

  return (
    <>
      <ChannelVideoContainer dataType="video" data={data} />
      {status === "loading" && <LoadingSpinner />}
    </>
  );
};

export default ChannelVideos;
