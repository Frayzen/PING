import { useState, createContext } from "react";
import { Toast, TOAST_STATUS } from "bootstrap-toaster";

export const setupProjectManager = () => {
    const [current, setCurrent] = useState('/home/tim/workspace/s6/ai/NumpyAI-Models/');
    return {
        current,
        setCurrent,
        selectProject: (callback) => {
            window.api.getProjectPath().then((path) => {
                callback(path);
            })
        },
        openProject: (project) => {
            if (project != undefined) {
                setCurrent(project);
                return;
            }
        },
        closeProject: () => {
            setCurrent(null);
        },

    }
}

export const ProjectManagerContext = createContext(null);

