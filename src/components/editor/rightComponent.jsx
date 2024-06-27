import React from "react";
import AlertComponent from "./alertComponent.jsx";
import OpenFiles from "./openFiles/openFiles.jsx";

const RightComponent = () => {
    return (
        <>
            <OpenFiles />
            <AlertComponent
                title="Bootstrap"
                time="11 mins ago"
                content="Hello, world! This is a toast message."
            />
        </>
    );
}

export default RightComponent;
