const fs = require('fs');
const path = require('path');

function getAllFilesInDirectory(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        return files.map(file => path.join(dirPath, file));
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
        return [];
    }
}

function isDirectory(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isDirectory();
    } catch (err) {
        console.error(`Error checking if path is directory ${filePath}:`, err);
        return false;
    }
}

export function retrieveAllFilesMatchingPattern(baseDir, pattern) {
    try {
        const files = fs.readdirSync(baseDir);
        const matchingFiles = files.filter(file => file.startsWith(pattern));
        return matchingFiles.map(file => path.join(baseDir, file));
    } catch (err) {
        console.error(`Error retrieving files matching pattern in ${baseDir}:`, err);
        return [];
    }
}

export function printTree(matchpath, indent = '', allFiles = []) {
    try {
        if (fs.existsSync(matchpath)) {
            const stat = fs.statSync(matchpath);

            if (stat.isFile()) {
                return [matchpath];
            }

            const files = getAllFilesInDirectory(matchpath);

            files.forEach(file => {
                allFiles.push(file);

                if (isDirectory(file)) {
                    printTree(file, indent + '  ', allFiles);
                }
            });

            return allFiles;
        } else {
            const dirName = path.dirname(matchpath);
            const baseName = path.basename(matchpath);
            const matchingFiles = retrieveAllFilesMatchingPattern(dirName, baseName);

            matchingFiles.forEach(file => {
                allFiles.push(file);

                if (isDirectory(file)) {
                    printTree(file, indent + '  ', allFiles);
                }
            });

            return allFiles;
        }
    } catch (err) {
        console.error(`Error processing path ${matchpath}:`, err);
        return null;
    }
}

export function getFilesJson(dirPath, pattern = '') {
    try {
        const filesJson = [];

        function buildFilesJson(currentDirPath, json) {
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
                        json.push(folderObject);
                        buildFilesJson(filePath, folderObject.children);
                    }
                } else {
                    if (file.startsWith(pattern)) {
                        const fileObject = {
                            name: fileName,
                            type: 'file',
                            path: filePath
                        };
                        json.push(fileObject);
                    }
                }
            });
        }

        buildFilesJson(dirPath, filesJson);
        return JSON.stringify(filesJson, null, 2);
    } catch (err) {
        console.error(`Error building files JSON for path ${dirPath}:`, err);
        return null;
    }
}



export function filterFilesJson(filesJson, searchString) {
    try {
        const filterFiles = (json, currentPath = '') => {
            return json
                .map(item => {
                    const newPath = path.join(currentPath, item.name);
                    const searchLower = searchString.toLowerCase(); 

                    if (item.type === 'folder') {
                        const children = filterFiles(item.children, newPath);
                        if (children.length > 0 || newPath.toLowerCase().includes(searchLower)) { 
                            return { ...item, children };
                        }
                    } else if (newPath.toLowerCase().includes(searchLower)) { 
                        return item;
                    }
                    return null;
                })
                .filter(item => item !== null);
        };

        const parsedJson = JSON.parse(filesJson);
        const filteredJson = filterFiles(parsedJson);
        return JSON.stringify(filteredJson, null, 2);
    } catch (err) {
        console.error('Error filtering files JSON:', err);
        return null;
    }
}
