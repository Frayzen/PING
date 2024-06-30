import React, { useContext, useState, useEffect } from "react";
import LeftComponent from "./leftComponent.jsx";
import RightComponent from "./rightComponent.jsx";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import { FileManagerContext, setupFileManager } from "../../managers/fileManager.js";
import { TerminalManagerContext, setupTerminalManager } from "../../managers/terminalManager.js";
import ShortcutHandler from "../shortcut_component.jsx";
import TerminalComponent from "./terminal.jsx";

const Editor = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    return (
        <FileManagerContext.Provider value={setupFileManager(projectManager.current)}>
            <TerminalManagerContext.Provider value={setupTerminalManager(projectManager.current)}>
                <ShortcutHandler />
                <div className="w-25 bg-body-secondary">
                    <LeftComponent />
                </div>
                <div className="w-75 h-100 d-flex flex-column bg-body-tertiary">
                    <RightComponent />
                </div>
            </TerminalManagerContext.Provider>
        </FileManagerContext.Provider >
    );
}

export default Editor;
