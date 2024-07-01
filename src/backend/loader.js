import fileEndpoints from "./files.js";
import termEndpoints from "./term.js";
import persistentEndpoints from "./persistent.js";
import { ipcMain } from 'electron';

const endpoints = [];

const handleEndpoints = (eps) => {
    // for each key value pair in eps
    Object.entries(eps).forEach(([key, fn]) => {
        ipcMain.handle(key, async (event, ...args) => {
            return fn(...args);
        });
        endpoints.push(key);
    });
}

const loadBackend = () => {
    handleEndpoints(fileEndpoints);
    handleEndpoints(termEndpoints);
    handleEndpoints(persistentEndpoints);
    ipcMain.on('fetchEndpoints', (event) => {
        event.returnValue = endpoints;
    });
}

export default loadBackend;

