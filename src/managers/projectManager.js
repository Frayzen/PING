import { useState, createContext } from "react";

export const setupProjectManager = () => {
    const [current, setCurrent] = useState(null);
    return {
        current,
        setCurrent,
    };
}

export const ProjectManagerContext = createContext(null);

