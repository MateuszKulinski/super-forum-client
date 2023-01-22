import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { __WIDTH__ } from "../../assets/consts";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./LeftMenu.css";

const GetAllCategories = gql`
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;

const LeftMenu = () => {
    const { loading, error, data } = useQuery(GetAllCategories);
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Pobieranie...</div>
    );

    useEffect(() => {
        if (loading) {
            setCategories(<span>Trwa wczytywanie...</span>);
        } else if (error) {
            setCategories(<span>Podczas wczytywania wystąpił błąd...</span>);
        } else {
            if (data && data.getAllCategories) {
                const cats = data.getAllCategories.map((cat: any) => {
                    return (
                        <li key={cat.id} className="navLi">
                            <Link to={`/categorythreads/${cat.id}`}>
                                {cat.name}
                            </Link>
                        </li>
                    );
                });
                setCategories(<ul className="category">{cats}</ul>);
            }
        }
        // getCategories()
        //     .then((categories: Array<Category>) => {
        //         const cats = categories.map((item) => {
        //             return <li key={item.id}>{item.name}</li>;
        //         });
        //         setCategories(<ul className="category">{cats}</ul>);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, [data]);
    if (width < __WIDTH__) return null;
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
