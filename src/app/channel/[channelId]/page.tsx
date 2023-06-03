/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ChannelHome from "@/components/Channel/ChannelHome";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppSelector } from "@/redux/hooks";
import { NextPage } from "next";
import React from "react";
import { usePathname } from "next/navigation";

const channelId: NextPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { data, status } = useAppSelector(
    (state) => state.channelDetailsReducer
  );

  return (
    <div className="mb-10">
      <ChannelHome id={id} data={data.data} />
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default channelId;
