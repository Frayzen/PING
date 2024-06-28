import React, { useEffect } from "react";
import { ProjectManagerContext } from "../managers/projectManager";
import Mousetrap from "mousetrap";

const ShortcutHandler = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    useEffect(() => {
        Mousetrap.bind('ctrl+o', () => {
            projectManager.openProject();
        });
    }, []);
}

export default ShortcutHandler;


