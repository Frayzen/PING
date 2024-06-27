import React, { useState, useContext } from "react";
import { FileManagerContext } from "../fileManager";


const FileTreeElement = ({ file, searchString }) => {
    if (file.type == "folder") {
        const [isOpen, setIsOpen] = useState(true);
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
                <a href="#" onClick={toggle} className="text-white">
                    <i className={`fa-regular ${isOpen ? "fa-folder-open" : "fa-folder-closed"}`}></i>
                    {file.name}
                </a>
                <ul className={isOpen ? "" : "d-none"}>
                    {children.length > 0 && children.map((child, index) => {
                        return (
                            <li key={index}>
                                {child}
                            </li>
                        );
                    })}
                    {file.children.length == 0 && <li key="no-files" className="text-secondary ps-2">Empty</li>}
                </ul>
            </>
        );
    }

    if (!file.name.toLowerCase().includes(searchString.toLowerCase()))
        return null;
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
