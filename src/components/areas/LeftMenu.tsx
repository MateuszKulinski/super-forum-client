import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { __WIDTH__ } from "../../assets/consts";
import Category from "../../model/Category";
import { getCategories } from "../../services/DataService";

const LeftMenu = () => {
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Pobieranie...</div>
    );

    useEffect(() => {
        getCategories()
            .then((categories: Array<Category>) => {
                const cats = categories.map((item) => {
                    return <li key={item.id}>{item.name}</li>;
                });
                setCategories(<ul className="category">{cats}</ul>);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (width < __WIDTH__) return null;
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
