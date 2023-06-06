"use client";

import ChannelAbout from "@/components/Channel/ChannelAbout";
import ChannelChannelListing from "@/components/Channel/ChannelChannelListing";
import ChannelCommunityPosts from "@/components/Channel/ChannelCommunityPosts";
import ChannelLive from "@/components/Channel/ChannelLive";
import ChannelPlaylists from "@/components/Channel/ChannelPlaylists";
import ChannelSearch from "@/components/Channel/ChannelSearch";
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

  const pathParts = pathname.split("/");
  const tab = pathParts[3]?.charAt(0).toUpperCase() + pathParts[3]?.slice(1);
  const id = pathname.split("/")[2];

  useEffect(() => {
    dispatch(tabChange(tab));
  }, []);

  return (
    <div className="w-full text-white md:mx-auto md:w-4/5">
      {tab !== "Channels" && <h1 className="my-6 px-2 md:px-0">{tab}</h1>}
      {tab === "About" ? (
        <ChannelAbout about={data.meta.description} />
      ) : tab === "Videos" ? (
        <ChannelVideos id={id} />
      ) : tab === "Shorts" ? (
        <ChannelShorts id={id} />
      ) : tab === "Live" ? (
        <ChannelLive id={id} />
      ) : tab === "Channels" ? (
        <ChannelChannelListing id={id} />
      ) : tab === "Playlists" ? (
        <ChannelPlaylists id={id} />
      ) : tab === "Community" ? (
        <ChannelCommunityPosts id={id} />
      ) : tab === "Search" ? (
        <ChannelSearch id={id} />
      ) : (
        <p>Unfortunately api does not provide data for this tab :&#40;</p>
      )}
    </div>
  );
};

export default Page;
