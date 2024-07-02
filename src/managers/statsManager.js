import { useState, useEffect, createContext, useCallback } from "react";
import { createKeySequenceHandler } from "../backend/stats.js";

export const setupStatsManager = () => {
    const [keyPressCount, setKeyPressCount] = useState(0);
    const [keySequence, setKeySequence] = useState([]);
    const [matchedWords, setMatchedWords] = useState(0);

    const incKeyPress = useCallback((event) => {
        setKeyPressCount(prevCount => prevCount + 1);
    }, []);

    const incWords = () => {
        setMatchedWords(prevCount => prevCount + 1);
    };

    const keySequenceHandler = createKeySequenceHandler(incWords, setKeySequence);

    const handleKeyDown = useCallback((event) => {
        incKeyPress(event);
        keySequenceHandler(event);
    }, [incKeyPress, keySequenceHandler]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [incKeyPress]);

    var lastNbKeyPresses = 0;
    var lastNbWords = 0;
    const getStats = () => {
        const newNbKeyPresses = keyPressCount - lastNbKeyPresses;
        const newNbWords = matchedWords - lastNbWords;
        lastNbKeyPresses = keyPressCount;
        lastNbWords = matchedWords;
        return {
            nbKeyPresses: newNbKeyPresses,
            nbWords: newNbWords
        };
    };

    return {
        keyPressCount,
        matchedWords
    };
};

export const StatsManagerContext = createContext(null);

