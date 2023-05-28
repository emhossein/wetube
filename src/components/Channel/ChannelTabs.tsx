import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { tabChange } from "@/redux/slices/channelTabsStateSlice";
import Link from "next/link";
import React from "react";

const ChannelTabs = ({ tabs, id }: { tabs: string[]; id: string }) => {
  const dispatch = useAppDispatch();
  const { tabState } = useAppSelector((state) => state.channelTabsStateReducer);

  return (
    <div className="text-white">
      <div className="flex items-center w-4/5 mx-auto">
        {tabs.map((tab) => {
          return (
            <Link
              key={tab}
              href={`/channel/${id}/${tab === "Home" ? "" : tab}`}
              className={`center | w-[105px] h-12 ${
                tabState === tab && "border-b-2"
              }`}
              onClick={() => dispatch(tabChange(tab))}
            >
              {tab}
            </Link>
          );
        })}
      </div>
      <div className="w-full h-px bg-[#3F3F3F] -mt-px" />
    </div>
  );
};

export default ChannelTabs;
