import { useState, createContext } from "react";
import { Toast, TOAST_STATUS } from "bootstrap-toaster";

export const setupProjectManager = () => {
    const [current, setCurrent] = useState("/home/phoenix/Code/aiml/");
    return {
        current,
        setCurrent,
        openProject: () => {
            window.api.getProjectPath().then((path) => {
                if (path != undefined)
                    setCurrent(path);
                else {
                    Toast.create({
                        title: "Invalid path",
                        message: "Please provide a valid path",
                        status: TOAST_STATUS.DANGER,
                        timeout: 1000
                    })
                }
            })
        }

    }
}

export const ProjectManagerContext = createContext(null);

