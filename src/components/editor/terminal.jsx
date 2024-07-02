import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { TerminalManagerContext } from "../../managers/terminalManager.js";
import { Resizable } from "re-resizable";
import { SizeManagerContext } from "../../managers/sizeManager.js";
import { FileManagerContext } from "../../managers/fileManager.js";
import { ActivityManagerContext } from "../../managers/activityManager.js";

const minTermHeight = 100;
const maxTermHeight = 500;
const TerminalComponent = () => {
    const terminalManager = React.useContext(TerminalManagerContext);
    const Terminal = require('xterm').Terminal;
    const FitAddon = require('xterm-addon-fit').FitAddon;
    const sm = React.useContext(SizeManagerContext);
    const activityManager = React.useContext(ActivityManagerContext);
    const term = new Terminal({
        fontFamily: 'FiraCode Nerd Font',
        fontSize: 14,
        theme: {
            background: getComputedStyle(document.body).getPropertyValue('--term-bg-color'),
            cursor: '#ffffff',
            foreground: '#ffffff'
        }
    });
    const fitAddon = new FitAddon();
    useEffect(() => {
        if ($("#terminal-container .terminal").length > 0)
            return;
        term.loadAddon(fitAddon);
        terminalManager.terminalSetup((data) => {
            term.write(data);
        });
        term.onData(cmd => {
            terminalManager.terminalCommand(cmd);
            activityManager.handleKeyPress(cmd);
            activityManager.handleActivity();
        });
        term.open(document.getElementById('terminal-container'));
        fitAddon.fit();

        const xterm_resize_ob = new ResizeObserver(() => {
            // since we are observing only a single element, so we access the first element in entries array
            setTimeout(() => {
                try {
                    if ($("#terminal-container").outerHeight() < minTermHeight)
                        return;
                    fitAddon.fit();
                    term.refresh(0, term.rows - 1);
                } catch (err) {
                    console.log(err);
                }
            }, 100);
        });

        xterm_resize_ob.observe(document.getElementById('terminal-container'));
    }, []);

    const fileManager = React.useContext(FileManagerContext);
    useEffect(() => {
        fileManager.setOpenFiles(fileManager.openFiles);
    }, [sm.terminalCollapsed]);

    return (
        <Resizable
            size={{
                width: "100%",
                height: sm.terminalCollapsed ? 30 : sm.terminalHeight
            }}
            maxHeight={maxTermHeight}
            onResizeStop={(e, direction, ref, d) => {
                const newHeight = sm.terminalHeight + d.height;
                if (newHeight < minTermHeight || Math.abs(d.height) < 3)
                    sm.setTerminalCollapsed(true);
                else {
                    sm.setTerminalCollapsed(false);
                    sm.setTerminalHeight(newHeight);
                }
            }}
        >

            <div className={`h-100 w-100 bg-white ${sm.terminalCollapsed ? "d-none" : ""}`}>
                <div id="terminal-container" className="h-100 w-100 scrollbar d-flex overflow-hidden">
                </div>
            </div>
            {sm.terminalCollapsed &&
                <div className="text-center bg-dark h-100">
                    <i className="fa fa-chevron-up text-white"
                        style={{ fontSize: "1em", cursor: "pointer" }}
                        onClick={() => sm.setTerminalCollapsed(false)}>
                    </i>
                </div >
            }
        </Resizable >
    );
}

export default TerminalComponent;
