import React, { FC } from "react";
import DropDown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import Category from "../../../model/Category";
import CategoryDropDown from "../../CategoryDropDown";

interface ThreadCategoryProps {
    category?: Category;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({ category }) => {
    const sendOutSelectedCategory = (cat: Category) => {
        console.log("selected category", cat);
    };

    return (
        <div className="thread-category-container">
            <strong>{category?.name}</strong>
            <div style={{ marginTop: "1em" }}>
                <CategoryDropDown preselectedCategory={category} />
            </div>
        </div>
    );
};

export default ThreadCategory;
