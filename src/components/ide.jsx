import React from "react";
import { ProjectManagerContext } from "../managers/projectManager";
import Editor from "./editor/editor.jsx";
import ProjectPicker from "./project_picker/project_picker.jsx";

const IDE = () => {
    const projectManager = React.useContext(ProjectManagerContext);
    return (
        <>
            {projectManager.current == null ? <ProjectPicker /> : <Editor />}
        </>
    );
}

export default IDE;
