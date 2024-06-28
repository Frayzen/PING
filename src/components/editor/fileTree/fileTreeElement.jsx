import React, { useState, useContext } from "react";
import { FileManagerContext } from "../../../managers/fileManager";


const FileTreeElement = ({ file, searchString }) => {
    const fileManager = useContext(FileManagerContext);
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
                    <i className="fa-regular fa-plus" onClick={(event) => {
                        fileManager.createFile(file);
                        event.stopPropagation();
                    }}></i>
                    <i className="fa-regular fa-trash" onClick={(event) => {
                        fileManager.deleteFile(file);
                        event.stopPropagation();
                    }}></i>
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
