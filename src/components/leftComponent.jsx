import React, { useState } from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";

const LeftComponent = () => {
    const [searchString, setSearchString] = useState("");
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <h3 className="text-center">File Tree</h3>
                <SearchDir searchString={searchString} onChange={(event) => setSearchString(event.target.value)} />
                <FileTree searchString={searchString} />
                <div className="flex-grow-1"></div>
                <ProfileComponent />
            </div>
        </>
    );
}

export default LeftComponent;
