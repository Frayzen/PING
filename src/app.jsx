import React from "react";
import IDE from "./components/ide.jsx";

function App() {
    const { ProjectManagerContext, setupProjectManager } = require("./managers/projectManager.js");
    const { SizeManagerContext, setupSizeManager } = require("./managers/sizeManager.js");
    const { PersistentManagerContext, setupPersistentManager } = require("./managers/persistentManager.js");
    const { ActivityManagerContext, setupActivityManager } = require("./managers/activityManager.js");
    return (
        <PersistentManagerContext.Provider value={setupPersistentManager()}>
            <ProjectManagerContext.Provider value={setupProjectManager()}>
                <SizeManagerContext.Provider value={setupSizeManager()}>
                    <ActivityManagerContext.Provider value={setupActivityManager()}>
                        <div className="container-fluid bg-light-subtle min-vh-100 d-flex p-0"
                            style={{
                                width: "100vw",
                                height: "100vh",
                            }}
                        >
                            <IDE />
                        </div>
                    </ActivityManagerContext.Provider >
                </SizeManagerContext.Provider>
            </ProjectManagerContext.Provider>
        </PersistentManagerContext.Provider>
    );
}

export default App;
