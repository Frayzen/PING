import React, { useState } from "react";


const FileTreeElement = ({ file }) => {
    if (file.children != undefined) {
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
                    {file.children.map((child, index) => {
                        return (
                            <li key={index}>
                                <FileTreeElement file={child} />
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
    return (
        <>
            <a href="#" className="text-white">
                <i className="fa-brands fa-java"></i>
                {file.name}
            </a >
        </>
    );
};

export default FileTreeElement;
