import React from "react";
import { FileManagerContext } from "../fileManager.js";
import FileOpenText from "./fileOpenText.jsx";
import TabListItem from "./tabListItem.jsx";

const OpenFiles = () => {
    return (
        <FileManagerContext.Consumer>
            {(fileManager) =>
                <>
                    <ul className="nav nav-tabs border-0 align-self-end mt-1" id="myTab" role="tablist">
                        <li key="_0" className="nav-item flex-grow-0 p-1 border-bottom">
                        </li>
                        {fileManager.openFiles.map((file, index) => {
                            return <TabListItem active={index == fileManager.active} name={file.name} id={index} onclick={() => fileManager.setActive(index)} />
                        })}

                        <li key="_1" className="nav-item flex-grow-1 border-bottom">
                        </li>
                    </ul>
                    <div className="tab-content p-3 w-100" id="tabs">
                        {fileManager.openFiles.map((file, index) => {
                            return <FileOpenText active={index == fileManager.active} id={`tab${index}`} path={file.path} />
                        })}
                    </div>
                </>
            }
        </FileManagerContext.Consumer>
    );
}

export default OpenFiles;   
