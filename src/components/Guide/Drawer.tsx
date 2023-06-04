"use client";

import React from "react";
import DrawerItem from "./DrawerItem";
import { ExploreIcon, HomeIcon } from "../Icons";
import { useAppSelector } from "@/redux/hooks";

const Drawer = () => {
  const { showGuide } = useAppSelector((state) => state.guideStateReducer);

  return (
    <nav
      id="navigation-guide"
      className={`${
        showGuide ? "block" : "hidden"
      } absolute z-40 h-full w-full max-w-[240px] bg-black p-3 text-white md:static`}
    >
      <div className="sticky top-14">
        <DrawerItem text="home" icon={HomeIcon} />
        <DrawerItem text="explore" icon={ExploreIcon} />
      </div>
    </nav>
  );
};

export default Drawer;
