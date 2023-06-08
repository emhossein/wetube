import React, { useEffect } from "react";
import {
  fetchAdditionalChannelShorts,
  fetchChannelShorts,
} from "@/redux/slices/channelShortsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ChannelVideoContainer from "./ChannelVideoContainer";
import LoadingSpinner from "../LoadingSpinner";
import { useBottomReached } from "@/hooks/useBottomReached";

const ChannelShorts = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelShortsReducer
  );

  const isBottomReached = useBottomReached();

  useEffect(() => {
    dispatch(fetchChannelShorts(id));
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(fetchAdditionalChannelShorts({ id, token: data.continuation }));
    }
  }, [isBottomReached]);

  return (
    <>
      <ChannelVideoContainer dataType="shorts" data={data} />
      {status === "loading" && <LoadingSpinner />}
    </>
  );
};

export default ChannelShorts;
