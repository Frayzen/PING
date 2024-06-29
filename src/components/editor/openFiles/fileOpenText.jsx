import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
import TextEditor from "../text_editor/TextEditor.jsx";

const FileOpenText = ({ file }) => {
    const [loading, isLoading] = useState(true);
    const fileManager = useContext(FileManagerContext);
    const id = file.uid;
    const active = fileManager.active.uid == id;
    useLayoutEffect(() => {
        // wait 1s
        setTimeout(() => {
            // @ts-ignore
            $(`#${id}`).niceScroll({
                cursorborder: "1px solid #666",
            });
        }, 10);
    }, []);
    useEffect(() => {
        fileManager.fetchFileContent(file.path).then((response) => {
            file.content = response;
            isLoading(false);
        });
    }, []);

    return (
        <div className={`h-100 tab-pane fade ${active ? "show active" : ""}`} role="tabpanel" aria-labelledby={id}>
            {loading &&
                <div className="spinner-border text-secondary mx-auto my-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            {!loading && <TextEditor file={file} />}
        </div >
    );
};

export default FileOpenText;
