import React from "react";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { __WIDTH__ } from "../../../assets/consts";
import SideBarMenus from "./SideBarMenus";

const SideBar = () => {
    const { width } = useWindowDimensions();
    if (width < __WIDTH__) return null;
    return (
        <div className="sidebar">
            <SideBarMenus />
        </div>
    );
};

export default SideBar;
