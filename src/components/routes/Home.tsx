import React from "react";
import LeftMenu from "../areas/LeftMenu";
import Main from "../areas/main/Main";
import RightMenu from "../areas/rightMenu/RightMenu";
import SideBar from "../areas/sidebar/SideBar";
import Nav from "../areas/Nav";
import "./Home.css";

const Home: React.FC = () => {
    return (
        <div className="screen-root-container home-container">
            <div className="navigation">
                {" "}
                <Nav />
            </div>
            <SideBar />
            <LeftMenu />
            <Main />
            <RightMenu />
        </div>
    );
};

export default Home;
