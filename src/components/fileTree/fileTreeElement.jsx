import React, { useState, useContext } from "react";
import { FileManagerContext } from "../fileManager";


const FileTreeElement = ({ file }) => {
    if (file.type == "folder") {
        const [isOpen, setIsOpen] = useState(true);
        const toggle = () => {
            setIsOpen(!isOpen);
        };
        return (
            <>
                <a href="#" onClick={toggle} className="text-white">
                    <i className={`fa-regular ${isOpen ? "fa-folder-open" : "fa-folder-closed"}`}></i>
                    {file.name}
                </a>
                <ul className={isOpen ? "" : "d-none"}>
                    {file.children.length > 0 && file.children.map((child, index) => {
                        return (
                            <li key={index}>
                                <FileTreeElement file={child} />
                            </li>
                        );
                    })}
                    {file.children.length == 0 && <li key="no-files" className="text-secondary ps-2">Empty</li>}
                </ul>
            </>
        );
    }
    const fileManager = useContext(FileManagerContext);
    return (
        <>
            <a href="#" className="text-white" onClick={() => {
                fileManager.openFile(file);
            }}>
                <i className="fa-brands fa-java"></i>
                {file.name}
            </a >
        </>
    );
};

export default FileTreeElement;
