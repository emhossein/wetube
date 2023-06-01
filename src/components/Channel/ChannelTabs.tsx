import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
import Link from "next/link";
import React from "react";

const ChannelTabs = ({ tabs, id }: { tabs: string[]; id: string }) => {
  const dispatch = useAppDispatch();
  const { tabState } = useAppSelector((state) => state.channelTabsStateReducer);

  return (
    <div className="no-scrollbar | overflow-y-scroll text-white">
      <div className="flex w-4/5 items-center space-x-3 lg:mx-auto">
        {tabs.map((tab) => {
          return (
            <Link
              key={tab}
              href={`/channel/${id}/${tab === "Home" ? "" : tab}`}
              className={`center | h-12 text-xs md:w-fit md:text-sm lg:w-[105px] lg:text-base ${
                tabState === tab && "border-b-2"
              }`}
              onClick={() => dispatch(tabChange(tab))}
            >
              {tab}
            </Link>
          );
        })}
      </div>
      <div className="-mt-px h-px w-full bg-[#3F3F3F]" />
    </div>
  );
};

export default ChannelTabs;
