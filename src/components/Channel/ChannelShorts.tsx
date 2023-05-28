import { useBottomReached } from "@/hooks/useBottomReached";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdditionalChannelShorts,
  fetchChannelShorts,
} from "@/redux/slices/channelShortsSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import ChannelVideoContainer from "./ChannelVideoContainer";
import LoadingSpinner from "../LoadingSpinner";

const ChannelShorts = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelShortsReducer
  );

  const pathname = usePathname();
  const id = pathname.split("/")[2];
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
