import React from "react";
import { FileManagerContext } from "../fileManager.js";
const FileOpenText = ({ name, id, onclick }) => {
    return (
        <>
            <FileManagerContext.Consumer>
                {(fileManager) => {
                    const active = fileManager.active == id;
                    return (
                        <li key={`tab${id}`} className={`nav-item d-flex ${!active ? "border-0 border-bottom" : null}`} role="presentation">
                            <button nofocus className={`border-bottom-1 border-secondary nav-link bg-body-tertiary ${active ? "active text-white border-bottom-0" : "text-secondary"}`}
                                data-bs-toggle="tab" type="button" data-bs-target={`#${id}`}
                                role="tab" aria-controls={id.toString()} aria-selected={active} onClick={() => onclick()} >
                                <a className="text-white me-2" href="#">{name}</a>
                                <a href="#" onClick={e => {
                                    fileManager.closeFile(id);
                                    e.stopPropagation();
                                }}><i className="fa-solid fa-circle-xmark text-secondary"></i></a>
                            </button>
                        </li >
                    );
                }
                }
            </FileManagerContext.Consumer >
        </>
    );
}

export default FileOpenText;
