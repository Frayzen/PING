// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    onSaveText: (callback) => ipcRenderer.on('save-text', callback),
});

contextBridge.exposeInMainWorld('electronAPI', {
  fetchTree: (path) => ipcRenderer.send('fetch-tree', path)
})
