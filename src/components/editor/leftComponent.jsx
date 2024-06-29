import React, { useContext, useState } from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";
import { ProjectManagerContext } from "../../managers/projectManager.js";

const LeftComponent = () => {
    const [searchString, setSearchString] = useState("");
    const fileManager = useContext(FileManagerContext)
    const projectManager = useContext(ProjectManagerContext);
    let curPath = projectManager.current;
    const maxPathLength = 30;
    if (curPath.length > maxPathLength)
        curPath = "..."+curPath.slice(curPath.length-maxPathLength);
    return (
        <>
            <div className="d-flex h-100 flex-column py-2">
                <div>
                    <div className="d-flex mx-2">
                        <h4><b>{curPath}</b></h4>
                        <div className="flex-grow-1"></div>
                        <a href="#" className="text-white ms-2 h4" onClick={() => fileManager.fetchFiles()}>
                            <i className="fa fa-refresh" ></i>
                        </a>
                        {fileManager.saving && <i className="fa fa-spinner fa-spin"></i>}
                        {!fileManager.saving && (
                            <a href="#" className="text-white ms-2 h4" onClick={() => fileManager.saveFileContent()}>
                                <i className="fa fa-save" ></i>
                            </a>
                        )}
                    </div>
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
