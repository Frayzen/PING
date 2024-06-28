import { useState, useEffect, createContext, useRef } from "react";
import words from "../../public/words.json";

export const setupActivityManager = () => {
    const [xpBoost, setXpBoost] = useState(0);
    const [xp, setXp] = useState(50);
    const [keySequence, setKeySequence] = useState([]);
    const lastActivityTimeRef = useRef(Date.now());

    const wordWeight = 3;
    const inactiveWeight = 3;
    const maxWeight = 5;
    const boostInc = 1
    const nbImages = 6;
    const inactivityLimit = 10000;
    const boostPeriod = 500; 

    const handleActivity = () => {
        lastActivityTimeRef.current = Date.now();
    };

    let curXpBoost = xpBoost;
    let curXp = xp;
    const updateBoost = (inc) => {
        curXpBoost += inc ? boostInc : -boostInc;
        curXpBoost = Math.max(-1, Math.min(curXpBoost, maxWeight));
        if (curXpBoost < 0) { // inactive
            curXp = curXp + inactiveWeight;
            curXp = Math.max(0,  curXp); 
            setXp(curXp);
        }
        setXpBoost(curXpBoost);

    };
    const updateXp = (weight) => {
        curXp += weight * curXpBoost;
        curXp = Math.min(nbImages * 100, curXp); 
        setXp(curXp);
    };

      useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            setKeySequence(prevSequence => {
                const newSequence = [...prevSequence, key].slice(-Math.max(...words.map(seq => seq.length)));
                const matchedSequence = words.find(seq => newSequence.join('').endsWith(seq));
                if (matchedSequence) {
                    updateXp(wordWeight);
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
            const inc = timeSinceLastActivity < inactivityLimit;
            updateBoost(inc);
        }, boostPeriod);

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
