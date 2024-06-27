import { exec } from 'child_process';
export const PROJECT_DIR = "/home/tim/workspace/s6/project_ping/frontend/PING/project/";
export function execCommand(command) {
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

