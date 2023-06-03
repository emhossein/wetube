/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ChannelHero from "@/components/Channel/ChannelHero";
import ChannelTabs from "@/components/Channel/ChannelTabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
// import Head from "next/head"; // does not work
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const channelLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelDetailsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelDetails(id));
    // for when the user leave channel from a tab other than the home tab and comes back so it will be home tab again
    if (pathname.split("/").length === 3) {
      dispatch(tabChange("Home"));
    }
  }, []);

  return (
    <>
      <head>
        <title>{data?.meta?.title} - VisionTube</title>
        <meta property="og:title" content={data?.meta?.title} key="title" />
        <meta name="description" content={data?.meta?.description} />
      </head>
      <div className="w-full">
        {status === "succeeded" && (
          <>
            <ChannelHero data={data} />
            <ChannelTabs tabs={data?.meta?.tabs} id={id} />
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default channelLayout;
