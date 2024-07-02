import { useState, createContext, useContext, useEffect } from "react";
import { ProjectManagerContext } from "./projectManager";
import bootbox from "bootbox";

export const setupFileManager = (curPath) => {
    const [openFiles, setOpenFiles] = useState([]);
    const [active, setActive] = useState({ uid: "" });
    const [fileTree, setFileTree] = useState(null);
    const [edited, setEdited] = useState([]);
    const [saving, setSaving] = useState(false);

    const projectManager = useContext(ProjectManagerContext);
    useEffect(() => {
        setFileTree(null);
        setActive({ uid: "" });
        setOpenFiles([]);
    }, [projectManager.current]);

    const openFile = (file) => {
        const exist = openFiles.find((f) => f.uid === file.uid);
        if (exist) {
            setActive(exist);
            return;
        }
        setOpenFiles([...openFiles, file]);
        setActive(file);
    }
    const closeFile = function(id) {
        // set openfiles to the array without the file at position id
        if (active.uid == id && openFiles.length > 1)
            if (openFiles[openFiles.length - 1].uid != id)
                setActive(this.getNextFile());
            else
                setActive(this.getPrevFile());
        setOpenFiles(openFiles.filter((f) => {
            return (f.uid != id)
        }));
    }
    return {
        setOpenFiles,
        setFileTree,
        fileTree,
        active,
        setActive,
        openFiles,
        fetchFiles: async (onSuccess) => {
            setFileTree(null);
            // wait 1s
            await new Promise(resolve => setTimeout(resolve, 100));
            return window.api.fetchFiles(curPath).then((files) => {
                onSuccess(files);
            }).catch((e) => {
                console.log(e);
            });
        },
        fetchFileContent: async (path) => {
            return window.api.fetchFileContent(path).then((content) => {
                return content.join("\n");
            });
        },
        saveFileContent: async function() {
            const file = this.active;
            if (file.uid == "")
                return;
            setSaving(true);
            await window.api.saveFileContent(file.path, file.content);
            const edited = this.edited.filter((f) => f != file.uid);
            setEdited(edited);
            setSaving(false);
        },
        saving,
        openFile,
        closeFile,
        edited,
        setEdited,
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
                    newFile.parent = folder;
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
        getNextFile: function() {
            const index = this.openFiles.findIndex((f) => f.uid == this.active.uid);
            if (index == -1)
                return null;
            if (index == this.openFiles.length - 1)
                return this.openFiles[0];
            return this.openFiles[index + 1];
        },
        getPrevFile: function() {
            const index = this.openFiles.findIndex((f) => f.uid == this.active.uid);
            if (index == -1)
                return null;
            if (index == 0)
                return this.openFiles[this.openFiles.length - 1];
            return this.openFiles[index - 1];
        },
    };
}

export const FileManagerContext = createContext(null);

