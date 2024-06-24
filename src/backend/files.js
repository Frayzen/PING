import fs from "fs";
import path from 'path';
export function printTree(dirPath, indent = '', allFiles = []) {
    try {
        const files = fs.readdirSync(dirPath);
        var allFiles = [];

        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            console.log(fullPath);
            allFiles.push(fullPath);

            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                printTree(fullPath, indent + '  ', allFiles);
            }

        });
        return allFiles;
    } catch (err) {
        console.log(`Error reading directory ${dirPath}:`, err);
    }
    return null;

}

