import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { useParams } from "react-router-dom";
import ThreadCard from "./ThreadCard";
import Category from "../../../model/Category";
import { gql, useLazyQuery } from "@apollo/client";

const GetThreadsByCategoryId = gql`
    query getThreadsByCategoryId($categoryId: ID!) {
        getThreadsByCategoryId(categoryId: $categoryId) {
            ... on EntityResult {
                messages
            }
            ... on ThreadArray {
                threads {
                    id
                    title
                    body
                    views
                    points
                    user {
                        userName
                    }
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const GetThreadsLatest = gql`
    query getThreadsLatest {
        getThreadsLatest {
            ... on EntityResult {
                messages
            }
            ... on ThreadArray {
                threads {
                    id
                    title
                    body
                    views
                    points
                    user {
                        userName
                    }
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const Main = () => {
    const [
        execGetThreadsByCat,
        {
            //error: threadsByCatErr,
            //called: threadsByCatCalled,
            data: threadsByCatData,
        },
    ] = useLazyQuery(GetThreadsByCategoryId);
    const [
        execGetThreadsLatest,
        {
            //error: threadsLatestErr,
            //called: threadsLatestCalled,
            data: threadsLatestData,
        },
    ] = useLazyQuery(GetThreadsLatest);
    const { categoryId } = useParams();
    const [category, setCategory] = useState<Category | undefined>();
    const [threadCards, setThreadCards] = useState<Array<JSX.Element> | null>(
        null
    );
    const test = false;
    if (test) throw new Error("Błąd w komponencie MAIN!!!");

    useEffect(() => {
        console.log("main categoryId", categoryId);
        if (categoryId && parseInt(categoryId) > 0) {
            execGetThreadsByCat({
                variables: {
                    categoryId,
                },
            });
        } else {
            execGetThreadsLatest();
        }
    }, [categoryId]);

    useEffect(() => {
        if (
            threadsByCatData &&
            threadsByCatData.getThreadsByCategoryId &&
            threadsByCatData.getThreadsByCategoryId.threads
        ) {
            const threads = threadsByCatData.getThreadsByCategoryId.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });
            setCategory(threads[0].category);
            setThreadCards(cards);
        } else {
            execGetThreadsLatest();
        }
    }, [threadsByCatData]);

    useEffect(() => {
        console.log("main threadsLatestData", threadsLatestData);
        if (
            threadsLatestData &&
            threadsLatestData.getThreadsLatest &&
            threadsLatestData.getThreadsLatest.threads
        ) {
            const threads = threadsLatestData.getThreadsLatest.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });
            setCategory(new Category("0", "Najnowsze"));
            setThreadCards(cards);
        } else {
        }
    }, [threadsLatestData]);

    return (
        <main className="content">
            <MainHeader category={category} />
            <div>{threadCards}</div>
        </main>
    );
};

export default Main;
