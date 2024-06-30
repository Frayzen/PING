import React, { useEffect } from "react";
import { ProjectManagerContext } from "../managers/projectManager";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { FileManagerContext } from "../managers/fileManager";
import { SizeManagerContext } from "../managers/sizeManager";

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
                SAVE_TEXT: 'ctrl+s',
                OPEN_PROJECT: 'ctrl+o',
                NEXT_FILE: 'ctrl+tab',
                PREV_FILE: 'ctrl+shift+tab',
                CLOSE_FILE: 'ctrl+w',
                TOGGLE_FULLSCREEN: 'ctrl+.',
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
                    const next = fileManager.getNextFile();
                    if (next)
                        fileManager.closeFile(next.uid);
                },
                TOGGLE_FULLSCREEN: () => {
                    const val = !sm.leftCollapsed;
                    sm.setLeftCollapsed(val);
                    sm.setTerminalCollapsed(val);
                },
            }}
        />
    </>);
}

export default ShortcutHandler;


