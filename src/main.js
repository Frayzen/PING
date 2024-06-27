import { app, BrowserWindow, globalShortcut } from 'electron';
import { getFilesJson, filterFilesJson } from './backend/files';
import { ipcMain } from 'electron';
try {
    require('electron-reloader')(module)
} catch (_) { }


// Start the t
const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });
    
    ipcMain.on('fetch-tree', (event, path) =>
    {
        var files = getFilesJson('./test-project');
        var filteredFiles = filterFilesJson(files, path);

        console.log("all files = ", files);
        console.log("filtered files = ", filteredFiles);
    });

    mainWindow.removeMenu()

    globalShortcut.register('CommandOrControl+S', () => {
        mainWindow.webContents.send('save-text');
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    globalShortcut.register('CommandOrControl+D', () => {
        mainWindow.webContents.openDevTools();
    });

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    globalShortcut.register('CommandOrControl+S', () => {
        BrowserWindow.getFocusedWindow().webContents.send('save-text');
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
