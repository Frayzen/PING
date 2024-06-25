const fs = require('fs');
const path = require('path');


export function getFileContent(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log("recieved content", content);
        return content;
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return null;
    }
}
export function writeFileContent(filePath, content, append = false) {
    try {
        if (append) {
            fs.appendFileSync(filePath, content, 'utf8');
            console.log(`Appended content to file ${filePath}`);
        } else {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`File ${filePath} has been written successfully.`);
        }
        return true;
    } catch (err) {
        console.error(`Error writing to file ${filePath}:`, err);
        return false;
    }
}
export function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
        console.log(`Deleted file ${filePath}`);
        return true;
    } catch (err) {
        console.error(`Error deleting file ${filePath}:`, err);
        return false;
    }
}

export function createFile(filePath) {
    try {
        fs.writeFileSync(filePath, '', 'utf8');
        console.log(`Created file ${filePath}`);
        return true;
    } catch (err) {
        console.error(`Error creating file ${filePath}:`, err);
        return false;
    }
}

export function moveFile(src, dst) {
    const srcName = path.basename(src);
    const dstPath = path.join(dst, srcName);

    try {
        fs.renameSync(src, dstPath);
        console.log(`Moved ${src} to ${dstPath}`);
        return true;
    } catch (err) {
        console.error(`Error moving ${src} to ${dst}:`, err);
        return false;
    }
}

export function renameFile(src, newName) {
    const srcDir = path.dirname(src);
    const newFilePath = path.join(srcDir, newName);

    try {
        fs.renameSync(src, newFilePath);
        console.log(`Renamed ${src} to ${newFilePath}`);
        return true;
    } catch (err) {
        console.error(`Error renaming ${src} to ${newFilePath}:`, err);
        return false;
    }
}
