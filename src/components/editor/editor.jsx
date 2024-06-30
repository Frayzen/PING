import React, { useContext, useState, useEffect } from "react";
import LeftComponent from "./leftComponent.jsx";
import RightComponent from "./rightComponent.jsx";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import { FileManagerContext, setupFileManager } from "../../managers/fileManager.js";
import { TerminalManagerContext, setupTerminalManager } from "../../managers/terminalManager.js";
import ShortcutHandler from "../shortcut_component.jsx";
import TerminalComponent from "./terminal.jsx";
import { Resizable } from "re-resizable";
import { configure, HotKeys } from "react-hotkeys";
import { SizeManagerContext } from "../../managers/sizeManager.js";

const minLeftWidth = 100;
const defaultLeftWidth = 200;
const Editor = () => {
    const pm = React.useContext(ProjectManagerContext);
    const sm = React.useContext(SizeManagerContext);
    return (
        <FileManagerContext.Provider value={setupFileManager(pm.current)}>
            <TerminalManagerContext.Provider value={setupTerminalManager(pm.current)}>
                <ShortcutHandler />
                <LeftComponent />
                <div className="w-100 h-100 d-flex flex-column bg-body-tertiary">
                    <RightComponent />
                </div>
            </TerminalManagerContext.Provider>
        </FileManagerContext.Provider >
    );
}

export default Editor;
