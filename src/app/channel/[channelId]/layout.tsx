/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ChannelHero from "@/components/Channel/ChannelHero";
import ChannelTabs from "@/components/Channel/ChannelTabs";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
import { usePathname } from "next/navigation";

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
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

export default ChannelLayout;
