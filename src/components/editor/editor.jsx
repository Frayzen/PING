import React from "react";
import LeftComponent from "./leftComponent.jsx";
import RightComponent from "./rightComponent.jsx";

const Editor = () => {
    return (
        <>
            <div className="w-25 bg-body-secondary">
                <LeftComponent />
            </div>
            <div className="w-75 bg-body-tertiary">
                <RightComponent />
            </div>
        </>
    );
}

export default Editor;
