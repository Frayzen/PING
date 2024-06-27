import React from "react";
import RightComponent from "./components/rightComponent.jsx";
import LeftComponent from "./components/leftComponent.jsx";
import ProfileComponent from "./components/profile.jsx";
import { ActivityManager, setupActivityManager } from "./managers/activityManager.js";

function App() {
    return (
        <div className="container-fluid bg-light-subtle min-vh-100 min-vw-100 p-0 d-flex">
            <ActivityManager.Provider value={setupActivityManager()}>
                <div className="col-3 bg-body-secondary">
                    <LeftComponent />
                </div>
                <div className="w-100 bg-body-tertiary">
                    <RightComponent />
                </div>
                <ProfileComponent />
            </ActivityManager.Provider>
        </div>
    );
}

export default App;
