import { useState, createContext, useContext, useEffect } from "react";
import { ProjectManagerContext } from "./projectManager";
import bootbox from "bootbox";

export const setupFileManager = (curPath) => {
    const [openFiles, setOpenFiles] = useState([]);
    const [active, setActive] = useState("");
    const [fileTree, setFileTree] = useState(null);

    const projectManager = useContext(ProjectManagerContext);
    useEffect(() => {
        setFileTree(null);
        setActive("");
        setOpenFiles([]);
    }, [projectManager.current]);

    const openFile = (file) => {
        const exist = openFiles.find((f) => f.uid === file.uid);
        if (exist) {
            setActive(exist.uid);
            return;
        }
        setOpenFiles([...openFiles, file]);
        setActive(file.uid);
    }
    const closeFile = (id) => {
        // set openfiles to the array without the file at position id
        if (active == id && openFiles.length > 1)
            for (let i = 0; i < openFiles.length; i++)
                if (openFiles[i].uid == id) {
                    if (i == 0)
                        setActive(openFiles[i + 1].uid);
                    else
                        setActive(openFiles[i - 1].uid);
                    break;
                }
        setOpenFiles(openFiles.filter((f) => {
            return (f.uid != id)
        }));
    }
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
        openFile,
        closeFile,
        deleteFile: async (file) => {
            const path = file.path;
            const result = bootbox.confirm({
                title: "Are you sure?",
                message: "This will delete the " + file.type + " " + path,
                centerVertical: true,
                callback: async (result) => {
                    if (result) {
                        const deleted = await window.api.deleteFile(path);
                        if (deleted) {
                            closeFile(file.uid);
                            file.parent.children = file.parent.children.filter((f) => {
                                return (f.uid != file.uid)
                            });
                            setFileTree(fileTree);
                        }
                    }
                },
            });
        },
        createFile: async (folder) => {
            const name = bootbox.prompt({
                title: "Name of the file",
                centerVertical: true,
                callback: async (result) => {
                    if (name == null || name.length == 0)
                        return false;
                    console.log(folder.path + "/" + result)
                    const newPath = (folder.path + "/" + result).replace(/\/+/, "/");
                    const newFile = await window.api.createFile(newPath)
                    console.log(newFile)
                    if (newFile) {
                        folder.children.push(newFile);
                        setFileTree(fileTree);
                        if (newFile.type == "file")
                            openFile(newFile);
                    }
                }
            });
        },
    };
}

export const FileManagerContext = createContext(null);

