// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

const defineEndpoints = (endpoints) => {
    const ret = {};
    endpoints.forEach((name) => {
        ret[name] = (...args) => {
            return ipcRenderer.invoke(name, ...args);
        }
    });
    return ret;
}

const endpoints = ipcRenderer.sendSync('fetchEndpoints');
console.log(endpoints);
const endpointsObject = defineEndpoints(endpoints);
console.log(endpointsObject);
contextBridge.exposeInMainWorld('api', endpointsObject);
