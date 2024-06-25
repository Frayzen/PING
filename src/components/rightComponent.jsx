import React, { useContext } from "react";
import AlertComponent from "./alertComponent.jsx";
import OpenFiles from "./openFiles/openFiles.jsx";
import { FileManagerContext } from "./fileManager.js";

const RightComponent = () => {
    const fileManager = useContext(FileManagerContext);
    return (
        <>
            <OpenFiles files={fileManager.openFiles} />
            <AlertComponent
                title="Bootstrap"
                time="11 mins ago"
                content="Hello, world! This is a toast message."
            />
        </>
    );
}

export default RightComponent;
