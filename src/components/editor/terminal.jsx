import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { TerminalManagerContext } from "../../managers/terminalManager.js";

const TerminalComponent = () => {
    const terminalManager = React.useContext(TerminalManagerContext);
    const Terminal = require('xterm').Terminal;
    const FitAddon = require('xterm-addon-fit').FitAddon;
    const term = new Terminal({
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: 14,
        theme: {
            background: '#111111',
            cursor: '#ffffff',
            foreground: '#ffffff'
        }
    });
    useEffect(() => {
        if ($("#terminal-container .terminal").length > 0)
            return;
        terminalManager.terminalSetup((data) => {
            term.write(data);
        });
        term.onData(cmd => {
            terminalManager.terminalCommand(cmd);
            $("#terminal-container .xterm-viewport").getNiceScroll().resize();
        });
        term.open(document.getElementById('terminal-container'));
        $("#terminal-container .xterm-viewport").niceScroll({
            cursorborder: "1px solid #ffffff",
        });
    }, []);
    return (
        <div className="h-100 w-100 bg-white">
            <div id="terminal-container" className="h-100 w-100">
            </div>
        </div>
    );
}

export default TerminalComponent;
