import React, { useEffect, useContext } from "react";
import FileTreeElement from "./fileTreeElement.jsx";
import { FileManagerContext } from "../../../managers/fileManager.js";

const FileTree = ({ searchString }) => {
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        if (fileManager.fileTree == null)
            fileManager.fetchFiles();
        return () => {
            // @ts-ignore
            $('#filetree').niceScroll({
                cursorborder: "1px solid #666",
            });
        };
    }, [fileManager.fileTree]);
    if (fileManager.fileTree == null) {
        return (
            <div className="text-center py-2 w-100">
                <i className="spinner-border text-secondary" role="status">
                </i>
            </div>
        );
    }
    return (
        // @ts-ignore
        <nobr>
            <ul className="ps-0 max-h-100 ">
                <li>
                    <FileTreeElement searchString={searchString} file={fileManager.fileTree} />
                </li>
            </ul>
        </nobr>
    );
};

export default FileTree;
