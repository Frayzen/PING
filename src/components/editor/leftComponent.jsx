import React, { useState } from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";

const LeftComponent = () => {
    const [searchString, setSearchString] = useState("");
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <div>
                    <h3 className="text-center">File Tree</h3>
                </div>
                <div>
                    <SearchDir searchString={searchString} onChange={(event) => setSearchString(event.target.value)} />
                </div>
                <div className="overflow-x-hidden overflow-y-hidden mx-1 my-2 h-100" id="filetree">
                    <FileTree searchString={searchString} />
                </div>
                <div>
                    <ProfileComponent />
                </div>
            </div>
        </>
    );
}

export default LeftComponent;
