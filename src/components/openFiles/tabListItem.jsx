import React, { useContext } from "react";
import { FileManagerContext } from "../fileManager.js";
const FileOpenText = ({ active, name, id, onclick }) => {
    const fileManager = useContext(FileManagerContext);
    return (
        <>
            <li key={`tab${id}`} className={`nav-item d-flex ${!active ? "border-0 border-bottom" : null}`} role="presentation">
                <button nofocus className={`border-bottom-1 border-secondary nav-link bg-body-tertiary ${active ? "active text-white border-bottom-0" : "text-secondary"}`}
                    data-bs-toggle="tab" type="button" data-bs-target={`#${id}`}
                    role="tab" aria-controls={id.toString()} aria-selected={active} onClick={
                        e => {
                            onclick();
                            e.preventDefault();
                        }
                    } >
                    <a className="text-white me-2" href="#">{name}</a>
                    <a href="#" onClick={e => {
                        fileManager.closeFile(id);
                        e.preventDefault();
                    }}><i className="fa-solid fa-circle-xmark text-secondary"></i></a>
                </button>
            </li >
        </>
    );
}

export default FileOpenText;
