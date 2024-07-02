import React, { useContext, useState, useEffect } from "react";
import LeftComponent from "./leftComponent.jsx";
import RightComponent from "./rightComponent.jsx";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import { FileManagerContext, setupFileManager } from "../../managers/fileManager.js";
import { TerminalManagerContext, setupTerminalManager } from "../../managers/terminalManager.js";
import ShortcutHandler from "../shortcut_component.jsx";
import { StatsManagerContext, setupStatsManager } from "../../managers/statsManager.js";

const Editor = () => {
    const pm = React.useContext(ProjectManagerContext);
    const stm = React.useContext(StatsManagerContext);

    return (
        <FileManagerContext.Provider value={setupFileManager(pm.current)}>
            <TerminalManagerContext.Provider value={setupTerminalManager(pm.current)}>
                <StatsManagerContext.Provider value={setupStatsManager()}>
                <ShortcutHandler />
                <LeftComponent />
                <div className="w-100 h-100 d-flex flex-column bg-body-tertiary">
                    <RightComponent />
                </div>
                </StatsManagerContext.Provider>
            </TerminalManagerContext.Provider>
        </FileManagerContext.Provider >
    );
}

export default Editor;
