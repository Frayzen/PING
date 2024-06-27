import React, { useEffect, useRef, useState } from 'react';

const ActivityMonitor = ({ updateBoost }) => {
    const lastActivityTimeRef = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;
            var inc = timeSinceLastActivity < 10000;
            console.log("timeSinceLastActivity = " + timeSinceLastActivity);
            console.log("inc = " + inc);
            updateBoost(inc);

        }, 2000);


        return () => {
            clearInterval(interval); // Clean up interval
        };
    }, [updateBoost]); // Depend on updateBoost, updateProgress, and isActive

    const handleActivity = () => {
        lastActivityTimeRef.current = Date.now(); // Update last activity time on any user activity
    };

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
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <div>
            {/* Optionally render content here */}
        </div>
    );
};

export default ActivityMonitor;

