"use client";

import ChannelAbout from "@/components/Channel/ChannelAbout";
import ChannelChannelListing from "@/components/Channel/ChannelChannelListing";
import ChannelLive from "@/components/Channel/ChannelLive";
import ChannelShorts from "@/components/Channel/ChannelShorts";
import ChannelVideos from "@/components/Channel/ChannelVideos";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.channelDetailsReducer);
  const channels = data.data.filter((dt) => dt.type === "channel_listing");

  const pathParts = pathname.split("/");
  const tab = pathParts[3]?.charAt(0).toUpperCase() + pathParts[3]?.slice(1);

  useEffect(() => {
    dispatch(tabChange(tab));
  }, []);

  return (
    <div className="mx-auto w-4/5 text-white">
      {tab !== "Channels" && <h1 className="my-6">{tab}</h1>}
      {tab === "About" ? (
        <ChannelAbout about={data.meta.description} />
      ) : tab === "Videos" ? (
        <ChannelVideos />
      ) : tab === "Shorts" ? (
        <ChannelShorts />
      ) : tab === "Live" ? (
        <ChannelLive />
      ) : tab === "Channels" ? (
        <ChannelChannelListing channels={channels} />
      ) : (
        <p>Unfortunately api does not provide data of this tab :&#40;</p>
      )}
    </div>
  );
};

export default Page;
