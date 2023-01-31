import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Thread.css";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import ThreadModel from "../../../model/Thread";
import Nav from "../../areas/Nav";
import ThreadBody from "./ThreadBody";
import ThreadResponsesBuilder from "./ThreadResponsesBuilder";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import { gql, useLazyQuery } from "@apollo/client";

const GetThreadById = gql`
    query GetThreadById($id: ID!) {
        getThreadById(id: $id) {
            ... on EntityResult {
                messages
            }
            ... on Thread {
                id
                user {
                    id
                    userName
                }
                lastModifiedOn
                title
                body
                points
                category {
                    id
                    name
                }
                threadItems {
                    id
                    body
                    points
                    user {
                        id
                        userName
                    }
                }
            }
        }
    }
`;

const Thread = () => {
    const [execGetThreadById, { data: threadData }] = useLazyQuery(
        GetThreadById,
        { fetchPolicy: "no-cache" }
    );
    const [thread, setThread] = useState<ThreadModel | undefined>();
    const { id } = useParams();
    const [readOnly, setReadOnly] = useState(false);

    const refreshThread = () => {
        if (id && parseInt(id) > 0) {
            execGetThreadById({
                variables: {
                    id,
                },
            });
        }
    };

    useEffect(() => {
        if (id && parseInt(id) > 0) {
            console.log("ID WĄTKU", id);
            execGetThreadById({
                variables: {
                    id,
                },
            });
        }
    }, [id, execGetThreadById]);

    useEffect(() => {
        console.log("Obiekt threadData", threadData);
        if (threadData && threadData.getThreadById) {
            setThread(threadData.getThreadById);
            setReadOnly(true);
        } else {
            setThread(undefined);
            setReadOnly(false);
        }
    }, [threadData]);
    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav />
            </div>
            <div className="thread-content-container">
                <div className="thread-content-post-container">
                    <ThreadHeader
                        userName={thread?.user.userName}
                        title={thread?.title}
                        lastModifiedOn={
                            thread ? thread.lastModifiedOn : new Date()
                        }
                    />
                    <ThreadCategory category={thread?.category} />
                    <ThreadTitle title={thread?.title} />
                    <ThreadBody body={thread?.body} readOnly={readOnly} />
                </div>
                <div className="thread-content-points-container">
                    <ThreadPointsBar
                        points={thread?.points || 0}
                        responseCount={
                            thread &&
                            thread.threadItems &&
                            thread.threadItems.length
                        }
                        threadId={thread?.id || "0"}
                        allowUpdatePoints={true}
                        refreshThread={refreshThread}
                    />
                </div>
                <div className="thread-content-response-container">
                    <hr className="thread-section-divider" />
                    <ThreadResponsesBuilder
                        threadItems={thread?.threadItems}
                        readOnly={readOnly}
                        refreshThread={refreshThread}
                    />
                </div>
            </div>
        </div>
    );
};

export default Thread;
