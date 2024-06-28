import { useState, createContext } from "react";

export const setupFileManager = (curPath) => {
    const [openFiles, setOpenFiles] = useState([]);
    const [active, setActive] = useState("");
    const [fileTree, setFileTree] = useState(null);
    return {
        setFileTree,
        fileTree,
        active,
        setActive,
        openFiles,
        fetchFiles: async () => {
            console.log(curPath);
            const files = await window.api.fetchFiles(curPath);
            console.log(files);
            return files
        },
        fetchFileContent: async (path) => {
            return await window.api.fetchFileContent(path);
        },
        saveFileContent: async (path, content) => {
        },
        openFile: (file) => {
            const exist = openFiles.find((f) => f.uid === file.uid);
            if (exist) {
                setActive(exist.uid);
                return;
            }
            setOpenFiles([...openFiles, file]);
            setActive(file.uid);
        },
        closeFile: (id) => {
            // set openfiles to the array without the file at position id
            if (openFiles.length == 1) {
                setOpenFiles([]);
                return;
            }
            for (let i = 0; i < openFiles.length; i++) {
                if (openFiles[i].uid == id) {
                    if (i == 0)
                        setActive(openFiles[i + 1].uid);
                    else
                        setActive(openFiles[i - 1].uid);
                    break;
                }
            }
            setOpenFiles(openFiles.filter((f) => {
                return (f.uid != id)
            }));
        },
    };
}

export const FileManagerContext = createContext(null);

