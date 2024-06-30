import { useState, useEffect, createContext, useRef } from "react";
import words from "../../public/words.json";

export const setupActivityManager = () => {
    let [xpBoost, setXpBoost] = useState(0);
    const [xp, setXp] = useState(50);
    const [keySequence, setKeySequence] = useState([]);
    let [active, setActive] = useState(false);

    const wordWeight = 0.5;
    const inactiveWeight = 3;
    const maxBoostValue = 5;
    const boostInc = 1
    const nbImages = 6;
    const boostPeriodSec = 1;
    const inactivityLimitSec = boostPeriodSec * 5;
    const xpPeriod = 2;

    let activityTimeout = null;
    let boostTimeout = null;
    const handleActivity = () => {
        console.log("top");
        setActive(true);
        active = true;
        if (activityTimeout) {
            clearTimeout(activityTimeout);
        }
        activityTimeout = setTimeout(() => {
            setActive(false);
            active = false;
            console.log("inactve");
        }, inactivityLimitSec * 1000);
    };

    let curXpBoost = xpBoost;
    useEffect(() => {
        const handleBoost = () => {
            clearTimeout(boostTimeout);
            boostTimeout = setTimeout(() => {
                curXpBoost += active ? boostInc : -boostInc;
                curXpBoost = Math.max(0, Math.min(curXpBoost, maxBoostValue));
                setXpBoost(curXpBoost);
                handleBoost();
            }, boostPeriodSec * 1000);
        };
        handleBoost();
        return () => {
            clearTimeout(boostTimeout);
        };
    }, [active]);

    let curXp = xp;
    const updateXp = (weight) => {
        curXp += weight * curXpBoost;
        // curXp = Math.min(nbImages * 100, curXp);
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
        xpBoost,
        xp,
        active,
    }
};

export const ActivityManager = createContext(null);
