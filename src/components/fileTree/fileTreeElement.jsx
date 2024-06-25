import React, { useState } from "react";


const FileTreeElement = ({ file, onFileClick }) => {
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
                                <FileTreeElement file={child} onFileClick={onFileClick} />
                            </li>
                        );
                    })}
                    {file.children.length == 0 && <li key="no-files" className="text-secondary ps-2">Empty</li>}
                </ul>
            </>
        );
    }
    return (
        <>
            <a href="#" className="text-white" onClick={onFileClick(file.path)}>
                <i className="fa-brands fa-java"></i>
                {file.name}
            </a >
        </>
    );
};

export default FileTreeElement;
