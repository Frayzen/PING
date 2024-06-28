const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

const randomUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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
        return result[0];
    },

    fetchFileContent: (path) => {
        return fs.readFileSync(path, 'utf8');
    },

    fetchFiles: (dirPath, pattern = '') => {
        try {
            const filesJson = [];
            const buildFiles = (currentDirPath, list) => {
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
                                children: []
                            };
                            list.push(folderObject);
                            buildFiles(filePath, folderObject.children);
                        }
                    } else {
                        if (file.startsWith(pattern)) {
                            const fileObject = {
                                name: fileName,
                                type: 'file',
                                path: filePath,
                                uid: randomUID()
                            };
                            list.push(fileObject);
                        }
                    }
                });
            }
            buildFiles(dirPath, filesJson);
            return {
                name: path.basename(dirPath),
                type: 'folder',
                children: filesJson,
                uid: randomUID()
            }
        } catch (err) {
            console.error(`Error building files JSON for path ${dirPath}:`, err);
            return null;
        }
    }
};

export default endpoints;
