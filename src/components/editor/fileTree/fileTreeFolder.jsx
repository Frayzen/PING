import React, { useState, useContext, useEffect } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
import FileTreeElement from "./fileTreeElement.jsx";

const FileTreeFolder = ({ file, searchString }) => {
    const fileManager = useContext(FileManagerContext);
    const [isOpen, setIsOpen] = useState(fileManager.fileTree == file);
    const [hover, setHover] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    if (searchString.length == 0 || file.name.toLowerCase().includes(searchString.toLowerCase()))
        searchString = "";
    let children = file.children.map((child) => {
        let elem = FileTreeElement({ file: child, searchString: searchString });
        if (elem == null)
            return null;
        return <FileTreeElement file={child} searchString={searchString} />;
    }).filter(e => {
        return e != null
    });
    if (children.length == 0 && !file.name.toLowerCase().includes(searchString.toLowerCase()))
        return null;
    return (
        <>
            <a href="#" onClick={toggle} className={`text-white ${hover ? "me-4" : ""}`}
                onMouseEnter={() => {
                    setHover(true);
                }} onMouseLeave={() => {
                    setHover(false);
                }}>
                <i className={isOpen ? "fa-solid fa-folder-open" : "fa fa-folder-closed"} ></i>
                <span className="px-2">{file.name}</span>
                {hover &&
                    <>
                        <i className="fa-regular fa-plus text-secondary" onClick={(event) => {
                            fileManager.createFile(file);
                            event.stopPropagation();
                        }}></i>
                        <i className="fa fa-trash text-secondary" onClick={(event) => {
                            fileManager.deleteFile(file);
                            event.stopPropagation();
                        }}></i>
                    </>
                }
            </a >
            {isOpen && <ul>
                {children.length > 0 && children.map((child, index) => {
                    return (
                        <li key={index}>
                            {child}
                        </li>
                    );
                })}
                {file.children.length == 0 && <li key="no-files" className="text-secondary ps-2">Empty</li>}
            </ul>}
        </>
    );
};

export default FileTreeFolder;
