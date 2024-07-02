import { useState, useEffect, createContext } from "react";
import { createKeySequenceHandler } from "../backend/stats.js";

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
                    return newXpBoost;
                });
                handleBoost();
            }, boostPeriodSec * 1000);
        };

        const handleXp = () => {
            clearTimeout(xpTimeout);
            xpTimeout = setTimeout(() => {
                setXp(prevXp => {
                    const newXp = Math.max(0, !active ? prevXp - inactiveWeight : prevXp);
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

    const updateXp = () => {
        setXp(prevXp => {
            const newXp = Math.min(nbImages * 100, prevXp + wordWeight * xpBoost);
            return newXp;
        });
    };
    const keySequenceHandler = createKeySequenceHandler(updateXp, setKeySequence);

    useEffect(() => {
        document.addEventListener('keypress', keySequenceHandler);

        return () => {
            document.removeEventListener('keypress', keySequenceHandler);
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

export const ActivityManagerContext = createContext(null);

