import React, { useContext, useEffect, useState } from "react";
import TabListItem from "./openFiles/tabListItem.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";
import FileOpenText from "./openFiles/fileOpenText.jsx";
import TerminalComponent from "./terminal.jsx";
import { Resizable } from "re-resizable";

const defaultTermHeight = 250;
const minTermHeight = 100;

const RightComponent = () => {
    const fileManager = useContext(FileManagerContext);
    const [termHeight, setTermHeight] = useState(250);
    const [collapsed, setCollapsed] = useState(false);
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
            <TerminalComponent />

        </>
    );
}

export default RightComponent;
