import { useState, useEffect, createContext } from "react";
import words from "../../public/words.json";

export const setupActivityManager = () => {
    const [xpBoost, setXpBoost] = useState(1);
    const [xp, setXp] = useState(50);
    const [keySequence, setKeySequence] = useState([]);
    const [active, setActive] = useState(false);

    const wordWeight = 0.5;
    const inactiveWeight = 1;
    const maxBoostValue = 5;
    const boostInc = 1;
    const nbImages = 6;
    const boostPeriodSec = 1;
    const inactivityLimitSec = boostPeriodSec * 5;
    const xpPeriodSec = 2;

    let activityTimeout = null;
    let boostTimeout = null;
    let xpTimeout = null;

    const handleActivity = () => {
        setActive(true);
        if (activityTimeout) {
            clearTimeout(activityTimeout);
        }
        activityTimeout = setTimeout(() => {
            setActive(false);
        }, inactivityLimitSec * 1000);
    };

    useEffect(() => {
        const handleBoost = () => {
            clearTimeout(boostTimeout);
            boostTimeout = setTimeout(() => {
                setXpBoost(prevXpBoost => {
                    const newXpBoost = Math.max(1, Math.min(prevXpBoost + (active ? boostInc : -boostInc), maxBoostValue));
                    console.log("Boost", newXpBoost);
                    return newXpBoost;
                });
                handleBoost();
            }, boostPeriodSec * 1000);
        };

        const handleXp = () => {
            clearTimeout(xpTimeout);
            xpTimeout = setTimeout(() => {
                setXp(prevXp => {
                    console.log(!active && xpBoost);
                    const newXp = Math.max(0, active ? prevXp - inactiveWeight : prevXp);
                    return newXp;
                });
                handleXp();
            }, xpPeriodSec * 1000);
        };

        handleXp();
        handleBoost();
        return () => {
            clearTimeout(boostTimeout);
            clearTimeout(xpTimeout);
        };
    }, [active]);

    const updateXp = (weight) => {
        setXp(prevXp => {
            const newXp = Math.min(nbImages * 100, prevXp + weight * xpBoost);
            console.log("Updated XP:", newXp);
            return newXp;
        });
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
    }, [xpBoost]);

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
    };
};

export const ActivityManager = createContext(null);

