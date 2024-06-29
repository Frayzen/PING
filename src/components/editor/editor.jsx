import React, { useContext, useState, useEffect } from "react";
import LeftComponent from "./leftComponent.jsx";
import RightComponent from "./rightComponent.jsx";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import { FileManagerContext, setupFileManager } from "../../managers/fileManager.js";
import ShortcutHandler from "../shortcut_component.jsx";

const Editor = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    return (
        <FileManagerContext.Provider value={setupFileManager(projectManager.current)}>
            <ShortcutHandler />
            <div className="w-25 bg-body-secondary">
                <LeftComponent />
            </div>
            <div className="w-75 bg-body-tertiary">
                <RightComponent />
            </div>
        </FileManagerContext.Provider>
    );
}

export default Editor;
