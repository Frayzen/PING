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
const endpointsObject = defineEndpoints(endpoints);
contextBridge.exposeInMainWorld('api', endpointsObject);
