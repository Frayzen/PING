import React from "react";
import TextEditor from "./components/text_editor/TextEditor.jsx";

function App() {
    return (
        <div className="container-fluid">
            <div className="w25">

            </div>
            <div className="w75">
                <TextEditor />
            </div>
        </div>
    );
}

export default App;
