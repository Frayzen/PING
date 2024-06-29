import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { FileManagerContext } from "../../../managers/fileManager";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { StreamLanguage } from '@codemirror/language';
import { langs } from '@uiw/codemirror-extensions-langs';
import { atomone, atomoneInit } from '@uiw/codemirror-theme-atomone';
import { autocompletion } from "@codemirror/autocomplete"

const FileOpenText = ({ file }) => {
    const [loading, isLoading] = useState(true);
    const fileManager = useContext(FileManagerContext);
    const id = file.uid;
    const active = fileManager.active == id;
    useLayoutEffect(() => {
        // wait 1s
        setTimeout(() => {
            // @ts-ignore
            $(`#${id}`).niceScroll({
                cursorborder: "1px solid #666",
            });
        }, 10);
    }, []);
    useEffect(() => {
        fileManager.fetchFileContent(file.path).then((response) => {
            file.content = response;
            isLoading(false);
        });
    }, []);
    return (
        <div className={`h-100 tab-pane fade ${active ? "show active" : ""}`} role="tabpanel" aria-labelledby={id}>
            {loading &&
                <div className="spinner-border text-secondary mx-auto my-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            {!loading &&
                <CodeMirror contentEditable="true" value={file.content} id={id}
                    placeholder="The file is empty"
                    theme={atomoneInit({
                        settings: {
                            background: "rgba(0, 0, 0, -0.3)",
                            gutterBackground: "transparent",
                            fontFamily: "inherit",
                        }
                    })}
                    extensions={[langs.python(), autocompletion()]}
                    style={{
                        caretColor: "#ffffff",
                        caretShape: "bar",
                        fontSize: "1rem",
                        fontFamily: "var(--bs-body-font-family)",
                        width: "100%",
                        height: "100%",
                        resize: "none",
                        overflow: "auto",
                        border: "none",
                        outline: "none",
                    }}></CodeMirror>
            }
        </div >
    );
};

export default FileOpenText;
