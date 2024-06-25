import React, { useState } from "react";
import FileOpenText from "./fileOpenText.jsx";
import TabListItem from "./tabListItem.jsx";

const OpenFiles = ({ files }) => {
    const [active, setActive] = useState(0);
    return (
        <>
            <ul className="nav nav-tabs border-0 align-self-end mt-1" id="myTab" role="tablist">
                <li key="_0" className="nav-item flex-grow-0 p-1 border-bottom">
                </li>
                {files.map((file, index) => {
                    return <TabListItem active={index == active} name={file.name} id={`tab${index}`} onclick={() => setActive(index)} />
                })}

                <li key="_1" className="nav-item flex-grow-1 border-bottom">
                </li>
            </ul>
            <div className="tab-content p-3 w-100" id="tabs">
                {files.map((file, index) => {
                    return <FileOpenText active={index == active} id={`tab${index}`} content={file.content} />
                })}
            </div>
        </>
    );
}

export default OpenFiles;   
