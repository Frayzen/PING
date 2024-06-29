import React, { useContext, useEffect, useState } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
const FileOpenText = ({ file }) => {
    const fileManager = useContext(FileManagerContext);
    const id = file.uid;
    const active = fileManager.active.uid == id;
    const [edited, setEdited] = useState(fileManager.edited.includes(id));
    useEffect(() => {
        setEdited(fileManager.edited.includes(id));
    }, [fileManager.edited]);

    return (
        <li className={`nav-item d-flex ${!active ? "border-0 border-bottom bg-dark" : null}`} role="presentation" key={`tab${id}`} >
            <button className={`border-bottom-1 d-flex flex-nowrap border-secondary nav-link ${active ? "active text-white border-bottom-0" : "text-secondary"}`}
                data-bs-toggle="tab" type="button" data-bs-target={`#${id}`}
                role="tab" aria-controls={id} aria-selected={active} onClick={() => fileManager.setActive(file)} >
                <a className="text-white me-2" href="#">{file.name}</a>
                <a href="#" onClick={e => {
                    fileManager.closeFile(id);
                    e.stopPropagation();
                }}><i className={ `fa-solid ${edited ? "fa-circle-xmark" : "fa-xmark"} text-secondary` }></i></a>
            </button>
        </li >
    );
}

export default FileOpenText;
