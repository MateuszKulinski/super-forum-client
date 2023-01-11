import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import {
    faUser,
    faRegistered,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";
import Logout from "../../auth/Logout";
import "./SideBarMenus.css";
import { Link } from "react-router-dom";

const SideBarMenus = () => {
    const user = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setshowLogout] = useState(false);

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const onClickToggleLogout = () => {
        setShowLogin(!showLogin);
    };

    return (
        <React.Fragment>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="menu-name">
                        <Link to={`/userprofile/${user?.id}`}>
                            {user?.userName}
                        </Link>
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        onClick={onClickToggleRegister}
                        icon={faRegistered}
                    />
                    <span className="menu-name">Rejestracja</span>
                    <Registration
                        isOpen={showRegister}
                        onClickToggle={onClickToggleRegister}
                    />
                </li>
                <li>
                    <FontAwesomeIcon
                        onClick={onClickToggleLogin}
                        icon={faSignInAlt}
                    />
                    <span className="menu-name">Logowanie</span>
                    <Login
                        isOpen={showLogin}
                        onClickToggle={onClickToggleLogin}
                    />
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span onClick={onClickToggleLogout} className="menu-name">
                        logout
                    </span>
                    <Logout
                        isOpen={showLogout}
                        onClickToggle={onClickToggleLogout}
                    />
                </li>
            </ul>
        </React.Fragment>
    );
};

export default SideBarMenus;
