/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ChannelHome from "@/components/Channel/ChannelHome";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppSelector } from "@/redux/hooks";
import { NextPage } from "next";
import React from "react";

const channelId: NextPage = () => {
  const { data, status } = useAppSelector(
    (state) => state.channelDetailsReducer
  );

  return (
    <div className="mb-10">
      <ChannelHome data={data.data} />
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default channelId;
