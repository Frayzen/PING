import React, { useContext, useState } from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";

const LeftComponent = () => {
    const [searchString, setSearchString] = useState("");
    const fileManager = useContext(FileManagerContext)
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <div>
                    <h3 className="text-center">File Tree
                        <a href="#" className="text-secondary ms-2" onClick={() => fileManager.fetchFiles()}>
                            <i className="fa fa-refresh" ></i>
                        </a>
                        {fileManager.saving && <i className="fa fa-spinner fa-spin"></i>}
                        {!fileManager.saving && (
                            <a href="#" className="text-secondary ms-2" onClick={() => fileManager.saveFileContent()}>
                                <i className="fa fa-save" ></i>
                            </a>
                        )}
                    </h3>
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
            </div >
        </>
    );
}

export default LeftComponent;
