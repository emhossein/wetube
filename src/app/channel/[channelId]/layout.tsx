/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ChannelHero from "@/components/Channel/ChannelHero";
import ChannelTabs from "@/components/Channel/ChannelTabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
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

    if (pathname.split("/").length === 3) {
      dispatch(tabChange("Home"));
    }
  }, []);

  return (
    <div className="w-full">
      {status === "succeeded" && (
        <>
          <ChannelHero data={data} />
          <ChannelTabs tabs={data.meta.tabs} id={id} />
          {children}
        </>
      )}
    </div>
  );
};

export default channelLayout;
