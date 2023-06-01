import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelLiveStreams } from "@/redux/slices/channelLiveStreamsSlice";
import React, { useEffect } from "react";
import ChannelVideoContainer from "./ChannelVideoContainer";
import LoadingSpinner from "../LoadingSpinner";

const ChannelLive = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelLiveStreamsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelLiveStreams(id));
  }, []);

  return (
    <>
      <ChannelVideoContainer dataType="live" data={data} />
      {status === "loading" && <LoadingSpinner />}
    </>
  );
};

export default ChannelLive;
