import React, { useState, useEffect, useContext } from "react";
import { FileManagerContext } from "../fileManager.js";
const FileOpenText = ({ id, path }) => {
    const [content, setContent] = useState(undefined);
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        fileManager.fetchFileContent(path).then((response) => {
            setContent(response);
        });
    }, [content]);
    return (
        <FileManagerContext.Consumer>
            {(fileManager) => {
                const active = fileManager.active == id;
                return (
                    <div className={`tab-pane fade ${active ? "show active" : ""}`} id={`tab${id}`} role="tabpanel" aria-labelledby={`${id}`}>
                        {content == undefined &&
                            <div className="spinner-border text-secondary mx-auto my-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        {content != undefined && content}
                    </div>
                );
            }}
        </FileManagerContext.Consumer >
    );
};

export default FileOpenText;
