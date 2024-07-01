import fileEndpoints from "./getFiles.js";
import termEndpoints from "./term.js";
import { ipcMain } from 'electron';

const endpoints = [];

const handleEndpoints = (eps) => {
    // for each key value pair in eps
    Object.entries(eps).forEach(([key, fn]) => {
        ipcMain.handle(key, async (event, ...args) => {
            return await fn(...args);
        });
        endpoints.push(key);
    });
}

const loadBackend = (ptyProcess) => {
    handleEndpoints(fileEndpoints);
    handleEndpoints(termEndpoints);
    ipcMain.on('fetchEndpoints', (event) => {
        event.returnValue = endpoints;
    });
}

export default loadBackend;

