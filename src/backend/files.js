const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

const isDirectory = (filePath) => {
    try {
        const stat = fs.statSync(filePath);
        return stat.isDirectory();
    } catch (err) {
        console.error(`Error checking if path is directory ${filePath}:`, err);
        return false;
    }
};

const getAllFilesInDirectory = (dirPath) => {
    try {
        const files = fs.readdirSync(dirPath);
        return files.map(file => path.join(dirPath, file));
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
        return [];
    }
};

const endpoints = {

    getProjectPath: () => {
        const result = dialog.showOpenDialogSync({
            properties: ['openDirectory'],
            title: 'Select a project folder',
        });
        return result ? result[0] : undefined;
    },

    deleteFile: (path) => {
        if (!fs.existsSync(path))
            return false;
        if (fs.lstatSync(path).isDirectory())
            fs.rmdirSync(path, { recursive: true });
        else
            fs.unlinkSync(path);
        return true;
    },

    saveFileContent: (path, content) => {
        fs.writeFileSync(path, content);
    },

    createFile: (path) => {
        try {
            if (path.endsWith("/")) {
                fs.mkdirSync(path);
                return {
                    name: path.split("/").pop(),
                    type: "folder",
                    path: path,
                    children: [],
                };
            }
            else {
                fs.writeFileSync(path, "");
                return {
                    name: path.split("/").pop(),
                    type: "file",
                    path: path,
                    uid: randomUID(path)
                };
            }
        } catch (err) {
            console.error(`Error creating file ${path}:`, err);
            return false;
        }
    },

    fetchFileContent: (path) => {
        return fs.readFileSync(path, 'utf8').toString().split("\n");
    },

    fetchFiles: (dirPath, pattern = '') => {
        try {
            const filesJson = [];
            const buildFiles = (parent, currentDirPath, list) => {
                const files = fs.readdirSync(currentDirPath);
                files.forEach(file => {
                    const filePath = path.join(currentDirPath, file);
                    const fileName = path.basename(file);
                    const stat = fs.statSync(filePath);

                    if (stat.isDirectory()) {
                        if (fileName.startsWith(pattern)) {
                            const folderObject = {
                                name: fileName,
                                type: 'folder',
                                path: filePath,
                                parent: parent,
                                children: []
                            };
                            list.push(folderObject);
                            buildFiles(folderObject, filePath, folderObject.children);
                        }
                    } else {
                        if (file.startsWith(pattern)) {
                            const fileObject = {
                                name: fileName,
                                type: 'file',
                                path: filePath,
                                parent: parent,
                                uid: filePath.replace(/\//g, "_")
                            };
                            list.push(fileObject);
                        }
                    }
                });
            }
            const base = {
                name: path.basename(dirPath),
                type: 'folder',
                path: dirPath,
                uid: dirPath.replace(/\//g, "_"), 
            };
            buildFiles(base, dirPath, filesJson);
            base.children = filesJson;
            return base;
        } catch (err) {
            console.error(`Error building files JSON for path ${dirPath}:`, err);
            return null;
        }
    }
};

export default endpoints;
