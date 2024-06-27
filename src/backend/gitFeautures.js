import { execCommand } from './execCommand';
export async function gitPull() {
    try {
        await execCommand('git pull');
        console.log('Git pull successful');
    } catch (error) {
        console.error('Git pull failed:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}

export async function gitPush() {
    try {
        await execCommand('git push');
        console.log('Git push successful');
    } catch (error) {
        console.error('Git push failed:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}

export async function gitCommit(message) {
    try {
        await execCommand(`git commit -m "${message}"`);
        console.log(`Git commit successful with message: "${message}"`);
    } catch (error) {
        console.error('Git commit failed:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}

export async function gitAdd(files) {
    try {
        const filesString = files.join(' ');
        await execCommand(`git add ${filesString}`);
        console.log(`Git add successful for files: ${files.join(', ')}`);
    } catch (error) {
        console.error('Git add failed:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}

