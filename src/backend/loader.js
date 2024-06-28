import fileEndpoints from "./files.js";
import { ipcMain } from 'electron';

const endpoints = [];

const handleEndpoints = (eps) => {
    // for each key value pair in eps
    Object.entries(eps).forEach(([key, fn]) => {
        console.log('registering endpoint ', key);
        ipcMain.handle(key, async (event, ...args) => {
            return await fn(...args);
        });
        endpoints.push(key);
    });
}

const loadBackend = () => {
    handleEndpoints(fileEndpoints);
    ipcMain.on('fetchEndpoints', (event) => {
        console.log('fetching endpoints ', endpoints);
        event.returnValue = endpoints;
    });
}

export default loadBackend;

