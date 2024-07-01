import React, { useState, useContext } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
import FileTreeFile from "./fileTreeFile.jsx";
import FileTreeFolder from "./fileTreeFolder.jsx";


const FileTreeElement = ({ file, searchString }) => {
    const fileManager = useContext(FileManagerContext);
    return (
        <>
            {file.type == "folder" && <FileTreeFolder file={file} searchString={searchString} />}
            {file.type == "file" && <FileTreeFile file={file} searchString={searchString} />}
        </>
    )
};

export default FileTreeElement;
