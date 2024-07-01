import React, { useContext, useEffect } from "react";
import TabListItem from "./openFiles/tabListItem.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";
import FileOpenText from "./openFiles/fileOpenText.jsx";
import TerminalComponent from "./terminal.jsx";

const RightComponent = () => {
    const fileManager = useContext(FileManagerContext);
    return (
        <>
            <ul className="nav nav-tabs border-0 align-self-end mt-1 d-flex flex-nowrap scrollbar w-100 h-auto" id="fileTabs" role="tablist">
                <li key="prelist" className="nav-item flex-grow-0 p-1 border-bottom">
                </li>
                {fileManager.openFiles.map((file) => {
                    return <TabListItem file={file} />
                })}
                <li key="postlist" className="nav-item flex-grow-1 border-bottom">
                </li>
            </ul>
            <div className="tab-content w-100 flex-grow-1" id="tabs">
                {fileManager.openFiles.map((file) => {
                    return <FileOpenText file={file} />
                })}
            </div>
            <div>
                <TerminalComponent />
            </div>
        </>
    );
}

export default RightComponent;
