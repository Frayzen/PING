import React, { useState, useEffect } from "react";
import FileTreeElement from "./fileTreeElement.jsx";
import { fileManager } from "../fileManager.js";

const FileTree = () => {
    const [fileTree, setFileTree] = useState(undefined);
    useEffect(() => {
        fileManager.fetchFiles().then((response) => {
            setFileTree(response);
        });
    }, []);
    useEffect(() => {
        return () => {
            $('#filetree').niceScroll({
                cursorborder: "1px solid #666",
            });
        };
    }, [fileTree]);
    if (fileTree == undefined) {
        return (
            <div className="spinner-border text-secondary mx-auto my-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
    return (
        <div className="overflow-x-hidden mx-1" id="filetree">
            <ul className="ps-0">
                <nobr>
                    <li>
                        <FileTreeElement file={fileTree} />
                    </li>
                </nobr>
            </ul>
        </div>
    );
};

export default FileTree;
