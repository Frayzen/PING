import React, { useContext } from "react";
import { FileManagerContext } from "../fileManager.js";
const FileOpenText = ({ file }) => {
    const fileManager = useContext(FileManagerContext);
    const id = file.uid;
    const active = fileManager.active == id;
    return (
        <li className={`nav-item d-flex ${!active ? "border-0 border-bottom" : null}`} role="presentation" key={`tab${id}`} >
            <button className={`border-bottom-1 d-flex flex-nowrap border-secondary nav-link bg-body-tertiary ${active ? "active text-white border-bottom-0" : "text-secondary"}`}
                data-bs-toggle="tab" type="button" data-bs-target={`#${id}`}
                role="tab" aria-controls={id} aria-selected={active} onClick={() => fileManager.setActive(id)} >
                <a className="text-white me-2" href="#">{file.name}</a>
                <a href="#" onClick={e => {
                    fileManager.closeFile(id);
                    e.stopPropagation();
                }}><i className="fa-solid fa-circle-xmark text-secondary"></i></a>
            </button>
        </li >
    );
}

export default FileOpenText;
