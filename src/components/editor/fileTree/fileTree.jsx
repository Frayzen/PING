import React, { useEffect, useContext } from "react";
import FileTreeElement from "./fileTreeElement.jsx";
import { FileManagerContext } from "../../../managers/fileManager.js";

const FileTree = ({ searchString }) => {
    const fileManager = useContext(FileManagerContext);
    if (fileManager.fileTree == null)
        fileManager.fetchFiles().then((tree) => {
            fileManager.setFileTree(tree);
        });
    useEffect(() => {
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
        <div className="overflow-x-hidden mx-1 h-100 my-2" id="filetree">
            <ul className="ps-0">
                <nobr>
                    <li>
                        <FileTreeElement searchString={searchString} file={fileManager.fileTree} />
                    </li>
                </nobr>
            </ul>
        </div>
    );
};

export default FileTree;
