import React, { useState, useEffect, useContext } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
const FileOpenText = ({ file }) => {
    const [loading, isLoading] = useState(true);
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        fileManager.fetchFileContent(file.path).then((response) => {
            file.content = response;
            isLoading(false);
        });
    }, []);
    const id = file.uid;
    const active = fileManager.active == id;
    return (
        <div className={`tab-pane fade ${active ? "show active" : ""}`} id={id} role="tabpanel" aria-labelledby={id}>
            {loading &&
                <div className="spinner-border text-secondary mx-auto my-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            {!loading && file.content}
        </div>
    );
};

export default FileOpenText;
