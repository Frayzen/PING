import React from "react";
import RightComponent from "./components/rightComponent.jsx";
import LeftComponent from "./components/leftComponent.jsx";

function App() {
    const { FileManagerContext, setupFileManager} = require("./components/fileManager.js");

    return (
        <FileManagerContext.Provider value={setupFileManager()}>
            <div className="container-fluid bg-light-subtle min-vh-100 min-vw-100 p-0 d-flex">
                <div className="col-3 bg-body-secondary">
                    <LeftComponent />
                </div>
                <div className="w-100 bg-body-tertiary">
                    <RightComponent />
                </div>
            </div>
        </FileManagerContext.Provider>

    );
}

export default App;
