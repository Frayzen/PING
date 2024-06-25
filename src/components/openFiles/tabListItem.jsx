import React from "react";
const FileOpenText = ({ active, name, id, onclick }) => {
    return (
        <>
            <li key={id} className={`nav-item ${!active ? "border-0 border-bottom" : null}`} role="presentation">
                <button nofocus className={`border-bottom-1 border-secondary nav-link bg-body-tertiary ${active ? "active text-white border-bottom-0" : "text-secondary"}`}
                    data-bs-toggle="tab" type="button" data-bs-target={`#${id}`}
                    role="tab" aria-controls={id} aria-selected={active} onClick={
                        e => {
                            onclick();
                            e.preventDefault();
                        }
                    } >{name}</button>
            </li >
        </>
    );
}

export default FileOpenText;
