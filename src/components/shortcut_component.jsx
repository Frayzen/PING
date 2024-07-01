import React, { useEffect } from "react";
import { ProjectManagerContext } from "../managers/projectManager";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { FileManagerContext } from "../managers/fileManager";
import { SizeManagerContext } from "../managers/sizeManager";
import bootbox from "bootbox";

const ShortcutHandler = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    const fileManager = React.useContext(FileManagerContext);
    configure({
        ignoreTags: ['INPUT', 'TEXTAREA'],
    })
    const sm = React.useContext(SizeManagerContext);
    return (<>
        <GlobalHotKeys
            allowChanges={true}
            keyMap={{
                CLOSE_PROJECT: 'ctrl+q',
                SAVE_TEXT: 'ctrl+s',
                OPEN_PROJECT: 'ctrl+o',
                NEXT_FILE: 'ctrl+tab',
                PREV_FILE: 'ctrl+shift+tab',
                CLOSE_FILE: 'ctrl+w',
                TOGGLE_LEFT: 'ctrl+;',
                TOGGLE_TERMINAL: "ctrl+'",
                TOGGLE_FULLSCREEN: 'ctrl+.',
                FOCUS_SEARCH: 'ctrl+f',
            }}
            handlers={{
                SAVE_TEXT: () => {
                    fileManager.saveFileContent()
                },
                OPEN_PROJECT: () => projectManager.openProject(),
                NEXT_FILE: () => {
                    const next = fileManager.getNextFile();
                    if (next)
                        fileManager.openFile(next);
                },
                PREV_FILE: () => {
                    const prev = fileManager.getPrevFile();
                    if (prev)
                        fileManager.openFile(prev);
                },
                CLOSE_FILE: () => {
                    const file = fileManager.active;
                    if (file)
                        fileManager.closeFile(file.uid);
                },
                TOGGLE_LEFT: () => {
                    const val = !sm.leftCollapsed;
                    sm.setLeftCollapsed(val);
                    if (val)
                        $("#filetree").focus();
                },
                FOCUS_SEARCH: () => {
                    $("#search-input").focus();
                },
                TOGGLE_TERMINAL: () => {
                    const val = !sm.terminalCollapsed;
                    sm.setTerminalCollapsed(val);
                    if (val)
                        $("#terminal-container").focus();
                },
                TOGGLE_FULLSCREEN: () => {
                    const val = !sm.leftCollapsed && !sm.terminalCollapsed;
                    sm.setLeftCollapsed(val);
                    sm.setTerminalCollapsed(val);
                },
                CLOSE_PROJECT: () => {
                    const result = bootbox.confirm({
                        title: "Do you really want to close the project?",
                        message: "This will close the project and all files. Make sure you have saved your work!",
                        className: "text-danger",
                        centerVertical: true,
                        callback: (result) => {
                            if (result)
                                projectManager.closeProject();
                        }
                    });
                },

            }}
        />
    </>);
}

export default ShortcutHandler;


