import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelLiveStreams } from "@/redux/slices/channelLiveStreamsSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import ChannelVideoContainer from "./ChannelVideoContainer";
import LoadingSpinner from "../LoadingSpinner";

const ChannelLive = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelLiveStreamsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelLiveStreams(id));
  }, []);
  console.log(data);

  return (
    <>
      <ChannelVideoContainer dataType="live" data={data} />
      {status === "loading" && <LoadingSpinner />}
    </>
  );
};

export default ChannelLive;
