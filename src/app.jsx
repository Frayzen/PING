import React from "react";
import RightComponent from "./components/editor/rightComponent.jsx";
import LeftComponent from "./components/editor/leftComponent.jsx";
import IDE from "./components/ide.jsx";

function App() {
    const { FileManagerContext, setupFileManager } = require("./managers/fileManager.js");
    const { ProjectManagerContext, setupProjectManager } = require("./managers/projectManager.js");

    return (
        <ProjectManagerContext.Provider value={setupProjectManager()}>
            <FileManagerContext.Provider value={setupFileManager()}>
                <div className="container-fluid bg-light-subtle min-vh-100 min-vw-100 p-0 d-flex">
                    <IDE />
                </div>
            </FileManagerContext.Provider>
        </ProjectManagerContext.Provider>
    );
}

export default App;
