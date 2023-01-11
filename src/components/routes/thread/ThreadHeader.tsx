import React, { FC } from "react";
import { getTimePastIfLessThanDay } from "../../../common/dates";
import UserNameAndTime from "./UserNameAndTime";

interface ThreadHeaderProps {
    userName?: string;
    lastModifiedOn: Date;
    title?: string;
}

const ThreadHeader: FC<ThreadHeaderProps> = ({
    userName,
    lastModifiedOn: lastModifieldOn,
    title,
}) => {
    return (
        <div className="thread-header-container">
            <h3>{title}</h3>
            <UserNameAndTime
                userName={userName}
                lastModifiedOn={lastModifieldOn}
            />
        </div>
    );
};

export default ThreadHeader;
