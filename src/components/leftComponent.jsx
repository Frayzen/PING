import React from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";

const LeftComponent = ({ fileManager }) => {
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <h3 className="text-center">File Tree</h3>
                <FileTree fileManager={fileManager} />
                <div className="flex-grow-1"></div>
                <ProfileComponent />
            </div>
        </>
    );
}

export default LeftComponent;
