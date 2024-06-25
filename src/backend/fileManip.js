const fs = require('fs');


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
