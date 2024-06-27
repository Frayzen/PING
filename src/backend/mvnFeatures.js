import { execCommand } from './execCommand';

async function mvnCompile() {
    try {
        await execCommand('mvn compile');
        console.log('Maven compile successful');
    } catch (error) {
        console.error('Maven compile failed:', error);
        throw error;
    }
}

async function mvnClean() {
    try {
        await execCommand('mvn clean');
        console.log('Maven clean successful');
    } catch (error) {
        console.error('Maven clean failed:', error);
        throw error;
    }
}

async function mvnTest() {
    try {
        await execCommand('mvn test');
        console.log('Maven test successful');
    } catch (error) {
        console.error('Maven test failed:', error);
        throw error;
    }
}

async function mvnPackage() {
    try {
        await execCommand('mvn package');
        console.log('Maven package successful');
    } catch (error) {
        console.error('Maven package failed:', error);
        throw error;
    }
}

async function mvnInstall() {
    try {
        await execCommand('mvn install');
        console.log('Maven install successful');
    } catch (error) {
        console.error('Maven install failed:', error);
        throw error;
    }
}

async function mvnExec() {
    try {
        await execCommand('mvn exec:java');
        console.log('Maven exec successful');
    } catch (error) {
        console.error('Maven exec failed:', error);
        throw error;
    }
}

async function mvnTree() {
    try {
        await execCommand('mvn dependency:tree');
        console.log('Maven dependency tree successful');
    } catch (error) {
        console.error('Maven dependency tree failed:', error);
        throw error;
    }
}

module.exports = {
    mvnCompile,
    mvnClean,
    mvnTest,
    mvnPackage,
    mvnInstall,
    mvnExec,
    mvnTree
};
