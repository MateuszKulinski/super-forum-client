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
        setshowLogout(!showLogout);
    };

    return (
        <React.Fragment>
            <ul>
                {user ? (
                    <li>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="menu-name">
                            <Link to={`/userprofile/${user.id}`}>
                                {user?.userName}
                            </Link>
                        </span>
                    </li>
                ) : null}
                {user ? null : (
                    <li>
                        <FontAwesomeIcon icon={faRegistered} />
                        <span
                            onClick={onClickToggleRegister}
                            className="menu-name"
                        >
                            Rejestracja
                        </span>
                        <Registration
                            isOpen={showRegister}
                            onClickToggle={onClickToggleRegister}
                        />
                    </li>
                )}
                {user ? null : (
                    <li>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span
                            onClick={onClickToggleLogin}
                            className="menu-name"
                        >
                            Logowanie
                        </span>
                        <Login
                            isOpen={showLogin}
                            onClickToggle={onClickToggleLogin}
                        />
                    </li>
                )}
                {user ? (
                    <li>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span
                            onClick={onClickToggleLogout}
                            className="menu-name"
                        >
                            Wylogowanie
                        </span>
                        <Logout
                            isOpen={showLogout}
                            onClickToggle={onClickToggleLogout}
                        />
                    </li>
                ) : null}
            </ul>
        </React.Fragment>
    );
};

export default SideBarMenus;
