"use client";

import React from "react";
import DrawerItem from "./DrawerItem";
import { ExploreIcon, HomeIcon } from "../Icons";

const Drawer = () => {
  return (
    <nav
      id="navigation-guide"
      className="p-3 md:block hidden max-w-[240px] w-full text-white"
    >
      <DrawerItem text="Home" icon={HomeIcon} />
      <DrawerItem text="Explore" icon={ExploreIcon} />
    </nav>
  );
};

export default Drawer;
