import React, { useState } from "react";
import { __WIDTH__ } from "../../assets/consts";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import SideBarMenus from "./sidebar/SideBarMenus";

const Nav = () => {
    const { width } = useWindowDimensions();
    const [showMenu, setShowMenu] = useState(false);

    const getMobileMenu = () => {
        if (width < __WIDTH__) {
            return (
                <FontAwesomeIcon
                    onClick={onClickToggle}
                    icon={faBars}
                    size="lg"
                    className="nav-mobile-menu"
                />
            );
        }
        return null;
    };

    const onClickToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
        setShowMenu(!showMenu);
    };

    const onRequestClose = (
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => {
        setShowMenu(false);
    };

    return (
        <>
            <ReactModal
                className="modal-menu"
                isOpen={showMenu}
                onRequestClose={onRequestClose}
                shouldCloseOnOverlayClick={true}
            >
                <SideBarMenus />
            </ReactModal>
            <nav>
                {getMobileMenu()}
                <strong>Super Forum</strong>
            </nav>
        </>
    );
};

export default Nav;
