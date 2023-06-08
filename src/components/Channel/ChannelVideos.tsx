import React, { useEffect } from "react";
import {
  fetchAdditionalChannelVideos,
  fetchChannelVideos,
} from "@/redux/slices/channelVideosSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ChannelVideoContainer from "./ChannelVideoContainer";
import LoadingSpinner from "../LoadingSpinner";
import { useBottomReached } from "@/hooks/useBottomReached";

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
