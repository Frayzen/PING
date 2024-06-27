const { exec } = require('child_process');
const path = require('path');

const PROJECT_DIR = path.resolve('/path/to/your/project');

function execGitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: PROJECT_DIR }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${command}: ${error.message}`);
                reject(error);
            } else if (stderr) {
                console.error(`${command} stderr: ${stderr}`);
                reject(new Error(stderr));
            } else {
                console.log(`${command} stdout: ${stdout}`);
                resolve(stdout);
            }
        });
    });
}

function gitPull() {
    return execGitCommand('git pull');
}

function gitPush() {
    return execGitCommand('git push');
}

function gitCommit(message) {
    return execGitCommand(`git commit -m "${message}"`);
}

function gitAdd(files) {
    const filesString = files.join(' ');
    return execGitCommand(`git add ${filesString}`);
}

module.exports = {
    gitPull,
    gitPush,
    gitCommit,
    gitAdd
};

