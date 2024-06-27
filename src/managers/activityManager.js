import { useState, useEffect, createContext, useRef } from "react";

export const setupActivityManager = () => {
    const [xpBoost, setXpBoost] = useState(0);
    const [xp, setXp] = useState(50); // Initial progress value
    const lastActivityTimeRef = useRef(Date.now());

    const handleActivity = () => {
        lastActivityTimeRef.current = Date.now();
        console.log("Activity detected, lastActivityTimeRef updated to: " + lastActivityTimeRef.current);
    };

    let curXpBoost = xpBoost;
    let curXp = xp;
    const updateBoost = (inc) => {
        curXpBoost += inc ? 1 : -1;
        curXpBoost = Math.max(-2, Math.min(curXpBoost, 5));
        curXp += curXpBoost;
        curXp = Math.max(0, Math.min(100, curXp));
        setXpBoost(curXpBoost);
        setXp(curXp);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;
            const inc = timeSinceLastActivity < 10000;
            console.log("currentTime = " + currentTime);
            console.log("lastActivityTimeRef.current = " + lastActivityTimeRef.current);
            console.log("timeSinceLastActivity = " + timeSinceLastActivity);
            console.log("inc = " + inc);
            updateBoost(inc);
        }, 2000);

        return () => {
            clearInterval(interval); // Clean up interval
        };
    }, []); // Add lastActivityTimeRef.current as a dependency

    useEffect(() => {
        // Add event listeners for mousemove, keypress, and click events
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);
        document.addEventListener('click', handleActivity);

        // Clean up event listeners when component unmounts
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
