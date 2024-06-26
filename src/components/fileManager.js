import { useState, createContext } from "react";

export const setupFileManager = () => {
    const [openFiles, setOpenFiles] = useState([{
        name: "Untitled",
        path: "./Untitled",
        uid: "new",
    },
    {
        name: "Untitled",
        path: "./Untitled",
        uid: "new2",
    },
    {
        name: "Untitled",
        path: "./Untitled",
        uid: "new3",
    },
    {
        name: "Untitled",
        path: "./Untitled",
        uid: "new4",
    },
    {
        name: "Untitled",
        path: "./Untitled",
        uid: "new5",
    },
    {
        name: "Untitled",
        path: "./Untitled",
        uid: "new6",
    },

    ]);
    const [active, setActive] = useState("new");
    return {

        fetchFiles: async () => {
            // wait 1 second
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                type: "folder",
                name: "root",
                path: "root",
                children: [
                    {
                        type: "folder",
                        name: "folder-one",
                        path: "root/folder-one",
                        children: [
                            {
                                type: "folder",
                                name: "folder-two",
                                path: "root/folder-one/folder-two",
                                children: [
                                    {
                                        type: "file",
                                        path: "root/folder-one/folder-two/file_one_long_oeifoiejoijefoijeofijeoifjoeijfoej.txt",
                                        name: "file_one_long_oeifoiejoijefoijeofijeoifjoeijfoej.txt",
                                        uid: 0,
                                    },
                                    {
                                        type: "file",
                                        path: "root/folder-one/folder-two/file_one.txt",
                                        name: "file_one.txt",
                                        uid: 1,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "folder",
                        name: "folder-two",
                        path: "root/folder-two",
                        children: [
                            {
                                type: "folder",
                                name: "folder-three",
                                path: "root/folder-two/folder-three",
                                children: [],
                            },
                            {
                                type: "file",
                                path: "root/folder-two/file.txt",
                                name: "file.txt",
                                uid: 3,
                            },
                            {
                                type: "file",
                                path: "root/folder-two/other.txt",
                                name: "other.txt",
                                uid: 4,
                            },
                        ],
                    },
                ],
            };
        },
        active,
        setActive,
        fetchFileContent: async (path) => {
            // wait 1 second
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (path == "./Untitled")
                return "";
            return "Tim is very wrong, whatever the HR manager says";
        },
        saveFileContent: async (path, content) => {
        },
        openFiles,
        openFile: (file) => {
            if (openFiles.find((f) => f.path === file.path)) {
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
        createNewFile: () => {
            setOpenFiles([...openFiles, {
                name: "Untitled",
                path: "./Untitled",
                uid: "new",
            }]);
            setActive("new");
        },
    };
}

export const FileManagerContext = createContext(null);

