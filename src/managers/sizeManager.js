import { useState, createContext } from "react";

export const setupSizeManager = () => {
    const [terminalHeight, setTerminalHeight] = useState(250);
    const [terminalCollapsed, setTerminalCollapsed] = useState(false);
    const [leftWidth, setLeftWidth] = useState(200);
    const [leftCollapsed, setLeftCollapsed] = useState(false);
    return {
        terminalHeight,
        setTerminalHeight,
        leftWidth,
        setLeftWidth,
        terminalCollapsed,
        setTerminalCollapsed,
        leftCollapsed,
        setLeftCollapsed,
    }
}

export const SizeManagerContext = createContext(null);
