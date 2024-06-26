import React, { useState, useEffect, useContext } from "react";
import { FileManagerContext } from "../fileManager.js";
const FileOpenText = ({ active, id, path }) => {
    const [content, setContent] = useState(undefined);
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        fileManager.fetchFileContent(path).then((response) => {
            setContent(response);
        });
    }, [content]);
    if (content == undefined) {
        return (
            <div className="spinner-border text-secondary mx-auto my-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <>
            <div className={`tab-pane fade ${active ? "show active" : ""}`} id={id} role="tabpanel" aria-labelledby={id}>
                {content}
            </div>
        </>
    );
}

export default FileOpenText;
