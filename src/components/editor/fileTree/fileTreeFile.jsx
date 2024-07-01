import React, { useState, useContext } from "react";
import { FileManagerContext } from "../../../managers/fileManager";

const FileTreeFile = ({ file, searchString }) => {
    const fileManager = useContext(FileManagerContext);
    const [hover, setHover] = useState(false);
    if (!file.name.toLowerCase().includes(searchString.toLowerCase()))
        return null;
    return (
        <>
            <a href="#" className="text-white" onClick={() => {
                fileManager.openFile(file);
            }}
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}>
                <i className="fa-brands fa-java"></i>
                <span className="px-2">{file.name}</span>

                {hover &&
                    <i className="fa fa-trash text-secondary" onClick={(event) => {
                        fileManager.deleteFile(file);
                        event.stopPropagation();
                    }}></i>
                }
            </a >
        </>
    );
};

export default FileTreeFile;
