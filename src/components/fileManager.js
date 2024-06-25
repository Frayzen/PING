import { useState } from "react";

const [openFiles, setOpenFiles] = useState([]);
export const fileManager = {
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
                            path: "root/folder-two/file_one.txt",
                            name: "file_one.txt",
                        },
                        {
                            type: "file",
                            path: "root/folder-two/file_one.txt",
                            name: "file_one.txt",
                        },
                    ],
                },
            ],
        };
    },
    fetchFileContent: async (path) => {
        return "Tim is very wrong, whatever the HR manager says";
    },
    saveFileContent: async (path, content) => {
    },
    openFiles: openFiles,
    openFile: (file) => {
        setOpenFiles([...openFiles, file]);
    },
    closeFile: (file) => {
        setOpenFiles(openFiles.filter((f) => f.path !== file.path));
    },
};
