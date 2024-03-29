import React, { FC } from "react";
import { Node } from "slate";
import RichEditor from "../../editor/RichEditor";

interface ThreadBodyProps {
    body?: string;
    readOnly?: boolean;
    sendOutBody: (body: Node[]) => void;
}

const ThreadBody: FC<ThreadBodyProps> = ({ body, readOnly, sendOutBody }) => {
    return (
        <div className="thread-body-container">
            <strong>Treść</strong>
            <div className="thread-body-editor">
                <RichEditor
                    existingBody={body}
                    readOnly={readOnly}
                    sendOutBody={sendOutBody}
                />
            </div>
        </div>
    );
};

export default ThreadBody;
