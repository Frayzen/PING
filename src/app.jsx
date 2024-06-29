import React from "react";
import RightComponent from "./components/editor/rightComponent.jsx";
import LeftComponent from "./components/editor/leftComponent.jsx";
import IDE from "./components/ide.jsx";

function App() {
    const { FileManagerContext, setupFileManager } = require("./managers/fileManager.js");
    const { ProjectManagerContext, setupProjectManager } = require("./managers/projectManager.js");

    return (
        <ProjectManagerContext.Provider value={setupProjectManager()}>
            <div className="container-fluid bg-light-subtle min-vh-100 d-flex p-0" style={{
                width: "100vw",
                height: "100vh",
            }}>
                <IDE />
            </div>
        </ProjectManagerContext.Provider>
    );
}

export default App;
