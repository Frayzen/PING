import React from "react";
import RightComponent from "./components/rightComponent.jsx";
import LeftComponent from "./components/leftComponent.jsx";
import ProfileComponent from "./components/profile.jsx";
import SearchDir from "./components/SearchDir.jsx";
function App() {
    return (
<div className="container-fluid bg-light-subtle min-vh-100 min-vw-100 p-0 d-flex">
            <div className="col-3 bg-body-secondary">
                <SearchDir />
        <LeftComponent />

            </div>
            <div className="w-100 bg-body-tertiary">
                <RightComponent />

            </div>
            <ProfileComponent />
        </div>
    );
}

export default App;
