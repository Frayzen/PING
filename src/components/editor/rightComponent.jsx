import React, { useContext, useEffect } from "react";
import TabListItem from "./openFiles/tabListItem.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";
import FileOpenText from "./openFiles/fileOpenText.jsx";

const RightComponent = () => {
    const fileManager = useContext(FileManagerContext);
    useEffect(() => {
        // @ts-ignore
        $('#fileTabs').niceScroll({
            cursorborder: "1px solid #666",
        });
    }, [fileManager.openFiles]);
    return (
        <>
            <ul className="nav nav-tabs border-0 align-self-end mt-1 d-flex flex-nowrap overflow-x-hidden py-1" id="fileTabs" role="tablist">
                <li key="prelist" className="nav-item flex-grow-0 p-1 border-bottom">
                </li>
                {fileManager.openFiles.map((file) => {
                    return <TabListItem file={file} />
                })}
                <li key="postlist" className="nav-item flex-grow-1 border-bottom">
                </li>
            </ul>
            <div className="tab-content w-100 h-100" id="tabs">
                {fileManager.openFiles.map((file) => {
                    return <FileOpenText file={file} />
                })}
            </div>
        </>
    );
}

export default RightComponent;
