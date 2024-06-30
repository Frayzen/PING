import { useState, createContext, useContext, useEffect } from "react";
import { ProjectManagerContext } from "./projectManager";
import bootbox from "bootbox";

export const setupTerminalManager = (curPath) => {
    const [termContent, setTermContent] = useState("");
    return {
        termContent,
        terminalSetup: (onData) => {
            window.api.terminalCreate(curPath);
            window.api.onTerminalData(onData);
        },
        terminalCommand: (data) => {
            window.api.terminalCommand(data);
        },
    };
}

export const TerminalManagerContext = createContext(null);
