export const fileManager = {
    fetchFiles: async () => {
        // wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
            name: "root",
            children: [
                {
                    name: "folder-one",
                    children: [
                        {
                            name: "folder-two",
                            children: [
                                {
                                    type: "file",
                                    name: "file_one_long_oeifoiejoijefoijeofijeoifjoeijfoej.txt",
                                },
                                {
                                    type: "file",
                                    name: "file_one.txt",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "folder-two",
                    children: [
                        {
                            type: "file",
                            name: "file_one.txt",
                        },
                        {
                            type: "file",
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
    }
};
