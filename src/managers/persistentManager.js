import { useState, createContext, useContext, useEffect } from "react";

export const setupPersistentManager = () => {
    const [recentProjects, setProjects] = useState([]);

    useEffect(() => {
        window.api.getProjects().then((projects) => {
            setProjects(projects);
        });
    }, []);

    return {
        projects: recentProjects,
        addProject: async function(project) {
            window.api.addProject(project).then((projects) => {
                setProjects(projects);
            });
        },
    };
}

export const PersistentManagerContext = createContext(null);
