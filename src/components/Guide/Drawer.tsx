"use client";

import React from "react";
import DrawerItem from "./DrawerItem";
import { ExploreIcon, HomeIcon } from "../Icons";

const Drawer = () => {
  return (
    <nav
      id="navigation-guide"
      className="hidden w-full max-w-[240px] p-3 text-white md:block"
    >
      <div className="sticky top-14">
        <DrawerItem text="home" icon={HomeIcon} />
        <DrawerItem text="explore" icon={ExploreIcon} />
      </div>
    </nav>
  );
};

export default Drawer;
