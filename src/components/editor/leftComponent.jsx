import React, { useContext, useState } from "react";
import FileTree from "./fileTree/fileTree.jsx";
import ProfileComponent from "./profile.jsx";
import SearchDir from "./SearchDir.jsx";
import { FileManagerContext } from "../../managers/fileManager.js";
import { ProjectManagerContext } from "../../managers/projectManager.js";
import LeftHeader from "./leftHeader.jsx";
import { Resizable } from "re-resizable";
import { SizeManagerContext } from "../../managers/sizeManager.js";

const minLeftWidth = 130;
const LeftComponent = () => {
    const [searchString, setSearchString] = useState("");
    const fileManager = useContext(FileManagerContext)
    const projectManager = useContext(ProjectManagerContext);
    const sm = useContext(SizeManagerContext);
    return (

        <Resizable
            size={{ width: sm.leftCollapsed ? 30 : sm.leftWidth, height: "100%" }}
            onResizeStop={(e, direction, ref, d) => {
                const newWidth = sm.leftWidth + d.width;
                if (newWidth < minLeftWidth || Math.abs(d.width) < 3)
                    sm.setLeftCollapsed(true);
                else {
                    sm.setLeftCollapsed(false);
                    sm.setLeftWidth(newWidth);
                }
            }}
        >
            {sm.leftCollapsed &&
                <div className="bg-body-secondary d-flex w-100 h-100 justify-content-start align-items-center">
                    <i className="fa fa-chevron-right" style={{ fontSize: "1em", cursor: "pointer", marginLeft: "10px" }} onClick={() => sm.setLeftCollapsed(false)}></i>
                </div>}
            {!sm.leftCollapsed &&
                <div className="d-flex h-100 w-100 flex-column p-0 pe-2">
                    <LeftHeader />
                    <div>
                        <SearchDir searchString={searchString} onChange={(event) => setSearchString(event.target.value)} />
                    </div>
                    <div className="scrollbar mx-1 my-2 h-100" id="filetree">
                        <FileTree searchString={searchString} />
                    </div>
                </div>
            }
        </Resizable>
    );
}

export default LeftComponent;
