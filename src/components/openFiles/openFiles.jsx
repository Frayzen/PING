import React, { useContext, useEffect } from "react";
import { FileManagerContext } from "../fileManager.js";
import FileOpenText from "./fileOpenText.jsx";
import TabListItem from "./tabListItem.jsx";

const OpenFiles = () => {
    const fileManager = useContext(FileManagerContext);
    if (fileManager.openFiles.length == 0)
        fileManager.createNewFile();
    useEffect(() => {
        $('#fileTabs').niceScroll({
            cursorborder: "1px solid #666",
        });
    }, [fileManager.openFiles]);
    return (
        <>
                <ul className="nav nav-tabs border-0 align-self-end mt-1 d-flex flex-nowrap overflow-hidden pb-3" id="fileTabs" role="tablist">
                    <li key="prelist" className="nav-item flex-grow-0 p-1 border-bottom">
                    </li>
                    {fileManager.openFiles.map((file) => {
                        return <TabListItem file={file} />
                    })}
                    <li key="postlist" className="nav-item flex-grow-1 border-bottom">
                    </li>
                </ul>
            <div className="tab-content p-3 w-100" id="tabs">
                {fileManager.openFiles.map((file) => {
                    return <FileOpenText file={file} />
                })}
            </div>
        </>
    );
}

export default OpenFiles;   
