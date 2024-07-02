import React, { useEffect, useContext } from "react";
import FileTreeElement from "./fileTreeElement.jsx";
import { FileManagerContext } from "../../../managers/fileManager.js";
import { Toast, TOAST_STATUS } from "bootstrap-toaster";
import { ProjectManagerContext } from "../../../managers/projectManager.js";

const FileTree = ({ searchString }) => {
    const fileManager = useContext(FileManagerContext);
    const projectManager = useContext(ProjectManagerContext);
    useEffect(() => {
        if (fileManager.fileTree == null)
            fileManager.fetchFiles((files) => {
                fileManager.setFileTree(files);
            });
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
