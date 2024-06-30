import React, { useContext } from "react";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import { FileManagerContext } from "../../managers/fileManager.js";

const LeftHeader = () => {
    const projectManager = useContext(ProjectManagerContext);
    const fileManager = useContext(FileManagerContext);
    return (
        <div className="mt-3">
            <div className="d-flex mx-2 flex-nowrap">
                <h4 style={{ textOverflow: "ellipsis", minWidth: "0px", overflow: "hidden" }}>
                    <b>{projectManager.current}</b>
                </h4>
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
    );
};

export default LeftHeader;

