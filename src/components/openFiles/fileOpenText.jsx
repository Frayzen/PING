import React from "react";
const FileOpenText = ({ active, id, content }) => {
    return (
        <>
            <div className={`tab-pane fade ${active ? "show active" : ""}`} id={id} role="tabpanel" aria-labelledby={id}>
                {content}
            </div>
        </>
    );
}

export default FileOpenText;
