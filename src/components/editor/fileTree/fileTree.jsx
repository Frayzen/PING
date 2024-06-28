import React, { useEffect, useContext } from "react";
import FileTreeElement from "./fileTreeElement.jsx";
import { FileManagerContext } from "../../../managers/fileManager.js";

const FileTree = ({ searchString }) => {
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        if (fileManager.fileTree == null)
            fileManager.fetchFiles().then((tree) => {
                fileManager.setFileTree(tree);
            });
        return () => {
            // @ts-ignore
            $('#filetree').niceScroll({
                cursorborder: "1px solid #666",
            });
        };
    }, [fileManager.fileTree]);
    if (fileManager.fileTree == null) {
        return (
            <div className="spinner-border text-secondary mx-auto my-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
    return (
        <ul className="ps-0 max-h-100 ">
            <nobr>
                <li>
                    <FileTreeElement searchString={searchString} file={fileManager.fileTree} />
                </li>
            </nobr>
        </ul>
    );
};

export default FileTree;
