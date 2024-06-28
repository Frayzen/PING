import { useState, createContext } from "react";

export const setupProjectManager = () => {
    const [current, setCurrent] = useState("/home/phoenix/Code/test/");
    return {
        current,
        setCurrent,
    };
}

export const ProjectManagerContext = createContext(null);

