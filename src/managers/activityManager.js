import { useState, useEffect, createContext, useRef } from "react";

export const setupActivityManager = () => {
    const [xpBoost, setXpBoost] = useState(0);
    const [xp, setXp] = useState(50);
    const lastActivityTimeRef = useRef(Date.now());

    const handleActivity = () => {
        lastActivityTimeRef.current = Date.now();
    };

    let curXpBoost = xpBoost;
    let curXp = xp;
    const updateBoost = (inc) => {
        curXpBoost += inc ? 1 : -1;
        curXpBoost = Math.max(-2, Math.min(curXpBoost, 5));
        curXp += curXpBoost;
        curXp = Math.max(0, Math.min(600, curXp)); // 600 because 6 images
        setXpBoost(curXpBoost);
        setXp(curXp);

    };


    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;
            const inc = timeSinceLastActivity < 10000;
            updateBoost(inc);
        }, 500); // change this time interval for faster/slower progress

        return () => {
            clearInterval(interval); 
        };
    }, []); 

    useEffect(() => {
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);
        document.addEventListener('click', handleActivity);

        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keypress', handleActivity);
            document.removeEventListener('click', handleActivity);
        };
    }, []);
    return {
        updateBoost,
        xpBoost,
        xp,
    };

};

export const ActivityManager = createContext(null);
