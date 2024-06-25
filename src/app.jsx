import React from "react";
import RightComponent from "./components/rightComponent.jsx";
import LeftComponent from "./components/leftComponent.jsx";

function App() {
    const { fileManager } = require("./components/fileManager.js");

    return (
<div className="container-fluid bg-light-subtle min-vh-100 min-vw-100 p-0 d-flex">
            <div className="col-3 bg-body-secondary">
                <LeftComponent fileManager={fileManager} />
            </div>
            <div className="w-100 bg-body-tertiary">
                <RightComponent fileManager={fileManager} />
            </div>
        </div>
    );
}

export default App;
