import { useState, useEffect, createContext, useRef } from "react";

export const setupActivityManager = () => {
    const [xpBoost, setXpBoost] = useState(0);
    const [xp, setXp] = useState(50);
    const [keySequence, setKeySequence] = useState([]);
    const lastActivityTimeRef = useRef(Date.now());

    const handleActivity = () => {
        lastActivityTimeRef.current = Date.now();
    };

    let curXpBoost = xpBoost;
    let curXp = xp;
    const updateBoost = (inc) => {
        curXpBoost += inc ? 1 : -1;
        curXpBoost = Math.max(-2, Math.min(curXpBoost, 5));
        // if (curXpBoost < 0) { // inactive
        //     curXp = Math.max(0, curXp + curXpBoost);
        //     curXp = Math.max(0, Math.min(600, curXp)); // 600 because 6 images
        //     setXp(curXp);
        // }
        setXpBoost(curXpBoost);

    };
    const updateXp = () => {
        curXp += 20;
        curXp = Math.max(0, Math.min(600, curXp)); // 600 because 6 images
        setXp(curXp);
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            setKeySequence(prevSequence => {
                const newSequence = [...prevSequence, key].slice(-4);
                if (newSequence.join('') === 'test') {
                    updateXp();
                    return [];
                }
                return newSequence;
            });
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);
    
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
