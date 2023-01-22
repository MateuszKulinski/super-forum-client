import React, { FC } from "react";
import { __WIDTH__ } from "../../../assets/consts";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import Category from "../../../model/Category";
import CategoryDropDown from "../../CategoryDropDown";
import "./MainHeader.css";

interface MainHeaderProps {
    category?: Category;
}

const MainHeader: FC<MainHeaderProps> = ({ category }) => {
    const { width } = useWindowDimensions();
    const getLabelElement = () => {
        if (width <= __WIDTH__) {
            return (
                <CategoryDropDown
                    navigate={true}
                    preselectedCategory={category}
                />
            );
        } else {
            return <strong>{category?.name || "Treść tymczasowa"}</strong>;
        }
    };

    return (
        <div className="main-header">
            <div
                className="title-bar"
                style={{ marginBottom: ".25em", paddingBottom: "0" }}
            >
                {getLabelElement()}
            </div>
        </div>
    );
};

export default MainHeader;
