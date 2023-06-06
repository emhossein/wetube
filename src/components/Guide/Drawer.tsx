"use client";

import { ExploreIcon, HomeIcon, UrlIcon } from "../Icons";

import DrawerItem from "./DrawerItem";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const Drawer = () => {
  const { showGuide } = useAppSelector((state) => state.guideStateReducer);

  return (
    <nav
      id="navigation-guide"
      className={`${
        showGuide ? "block" : "hidden"
      } absolute top-14 z-40 h-full w-full max-w-[240px] bg-black p-3 text-white md:sticky`}
    >
      <div className="sticky top-14">
        <DrawerItem text="home" icon={HomeIcon} />
        <DrawerItem text="explore" icon={ExploreIcon} />
        <DrawerItem text="Resolve Url" icon={UrlIcon} />
      </div>
    </nav>
  );
};

export default Drawer;
