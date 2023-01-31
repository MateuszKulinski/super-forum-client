import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/routes/Home";
import { Routes, Route } from "react-router-dom";
import Thread from "./components/routes/thread/Thread";
import UserProfile from "./components/routes/userProfile/UserProfile";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "./store/user/Reducer";
import { gql, useQuery } from "@apollo/client";
import { ThreadCategoriesType } from "./store/categories/Reducer";
import useRefreshReduxMe from "./hooks/useRefreshReduxMe";

const GetAllCategories = gql`
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`;

function App() {
    const { data: categoriesData } = useQuery(GetAllCategories);
    const { execMe, updateMe } = useRefreshReduxMe();

    useEffect(() => {
        execMe();
    }, [execMe]);

    useEffect(() => {
        updateMe();
    }, [updateMe]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (categoriesData && categoriesData.getAllCategories) {
            dispatch({
                type: ThreadCategoriesType,
                payload: categoriesData.getAllCategories,
            });
        }
    }, [dispatch, categoriesData]);

    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/categorythreads/:categoryId" element={<Home />} />
            <Route path="/thread/:id?" element={<Thread />} />
            <Route path="/userprofile/:id?" element={<UserProfile />} />
        </Routes>
    );
}

export default App;
