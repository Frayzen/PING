import fs from 'fs';
const homedir = require('os').homedir();
import { app } from 'electron';

const data = {
    projects: []
};
const appdatafolder = require('electron').app.getPath('userData');
const configPath = require('path').join(appdatafolder, 'config.json');

// Setup persistent data
(() => {
    console.log("Checking for projects");
    if (!fs.existsSync(configPath))
        fs.writeFileSync(configPath, JSON.stringify(data));
    const txt = fs.readFileSync(configPath);
    const retrieved = JSON.parse(txt.toString());
    Object.assign(data, retrieved);
})();

const endpoints = {
    getProjects: () => {
        return data.projects;
    },
    addProject: (project) => {
        console.log("Adding project");
        data.projects.push(project);
        if (data.projects.length > 10)
            data.projects = data.projects.slice(-10);
        return data.projects;
    },
}

app.on('will-quit', () => {
    console.log("Saving projects");
    console.log(JSON.stringify(data));
    fs.writeFileSync(configPath, JSON.stringify(data));
});

export default endpoints;
