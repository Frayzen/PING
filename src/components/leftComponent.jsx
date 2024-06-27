import React from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";

const LeftComponent = () => {
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <h3 className="text-center">File Tree</h3>
                <SearchDir />
                <FileTree />
                <div className="flex-grow-1"></div>
                <ProfileComponent />
            </div>
        </>
    );
}

export default LeftComponent;
