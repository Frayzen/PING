import React, { useEffect } from "react";
import { ProjectManagerContext } from "../managers/projectManager";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { FileManagerContext } from "../managers/fileManager";

const ShortcutHandler = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    const fileManager = React.useContext(FileManagerContext);
    configure({
        ignoreTags: ['INPUT', 'TEXTAREA'],
    })
    return (<>
        <GlobalHotKeys
            allowChanges={true}
            keyMap={{
                SAVE_TEXT: 'ctrl+s',
                OPEN_PROJECT: 'ctrl+o',
                NEXT_FILE: 'ctrl+tab',
                PREV_FILE: 'ctrl+shift+tab',
                CLOSE_FILE: 'ctrl+w',
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
            }}
        />
    </>);
}

export default ShortcutHandler;


