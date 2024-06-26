import { useState, createContext } from "react";

export const setupFileManager = () => {
    const [openFiles, setOpenFiles] = useState([]);
    const [active, setActive] = useState(0);
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
                                    },
                                    {
                                        type: "file",
                                        path: "root/folder-one/folder-two/file_one.txt",
                                        name: "file_one.txt",
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
                            },
                            {
                                type: "file",
                                path: "root/folder-two/other.txt",
                                name: "other.txt",
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
            setActive(openFiles.length);
        },
        closeFile: (id) => {
            if (id == active) {
                setActive(Math.max(id - 1, 0));
            }
            // set openfiles to the array without the file at position id
            setOpenFiles(openFiles.filter((_, i) => i != id));
        },
        createNewFile: () => {
            setOpenFiles([...openFiles, {
                name: "Untitled",
                path: "./Untitled",
            }]);
        },
    };
}

export const FileManagerContext = createContext(null);

