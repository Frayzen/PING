const os = require('os');
const pty = require('node-pty');
const { webContents } = require('electron');
var shell = os.platform() === "win32" ? "powershell.exe" : (process.env.SHELL || "/bin/sh");

var termProcess;
const createTerminal = (path) => {
    console.log("Creating terminal for " + path);
    termProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: path,
        env: process.env
    });
    termProcess.onData((data) => {
        for (let webContent of webContents.getAllWebContents()) {
            webContent.send('terminal.data', data);
        }
    });
    termProcess.onExit((code) => {
        createTerminal(path);
    });
};
const endpoints = {
    terminalCreate: (path) => {
        if (termProcess) {
            termProcess.kill();
            termProcess = null;
        }
        createTerminal(path);
    },
    terminalCommand: (data) => {
        termProcess.write(data);
    }
}

export default endpoints;
