import { execCommand, PROJECT_DIR } from './execCommand';
const fs = require('fs');
const path = require('path');


export function readIgnoreFile() {
    const ignoreFilePath = path.join(PROJECT_DIR, '.myideignore');
    if (!fs.existsSync(ignoreFilePath)) {
        throw new Error('.myideignore file not found');
    }
    const fileContent = fs.readFileSync(ignoreFilePath, 'utf-8');
    const lines = fileContent.split('\n').filter(Boolean);
    if (lines.some(line => typeof line !== 'string')) {
        throw new Error('.myideignore file contains non-string data');
    }
    return lines;
}


export async function anyCleanup() {
    const filesToRemove = readIgnoreFile();
    console.log(filesToRemove);
    const removeCommands = filesToRemove.map(file => `rm -rf ${file}`);
    console.log(removeCommands);
    const command = removeCommands.join(' && ');
    console.log(command);
    return execCommand(command)
        .then(() => console.log('Cleanup successful'))
        .catch(error => console.error('Cleanup failed:', error));
}

export async function anyDist() {
    return anyCleanup()
        .then(() => {
            const projectName = path.basename(PROJECT_DIR);
            const zipCommand = `zip -r ${projectName}.zip ${PROJECT_DIR}`;
            return execCommand(zipCommand);
        })
        .then(() => console.log('Dist creation successful'))
        .catch(error => console.error('Dist creation failed:', error));
}

