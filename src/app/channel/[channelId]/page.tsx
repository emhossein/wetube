/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const channelId: NextPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.channelDetailsReducer);
  console.log(data);

  useEffect(() => {
    dispatch(fetchChannelDetails(id));
  }, []);

  return (
    <div>
      <img
        src={data?.meta.banner?.[data?.meta.banner.length - 1]?.url}
        alt={data?.meta.channelHandle}
      />
    </div>
  );
};

export default channelId;
