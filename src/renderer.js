/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

window.$ = window.jQuery = require('jquery');
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'xterm/css/xterm.css';
import './css/fileTree.css'
import './css/profile.css'
import './css/term.css'
import './css/global.css'
import './css/editor.css'
import './index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import { Toast, TOAST_STATUS, TOAST_PLACEMENT } from "bootstrap-toaster";
Toast.setPlacement(TOAST_PLACEMENT.BOTTOM_RIGHT)
Toast.enableQueue(true)
