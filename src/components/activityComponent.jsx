import React, { useEffect, useRef, useState } from 'react';

const ActivityMonitor = ({ onActivityChange }) => {
    const lastActivityTimeRef = useRef(Date.now());
    const [isActive, setIsActive] = useState(false); // Track activity status

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            // Check if there has been activity in the last 2 seconds
            if (currentTime - lastActivityTimeRef.current <= 2000) {
                setIsActive(true); // Set isActive to true if there's recent activity
            } else {
                setIsActive(false); // Set isActive to false if there's no recent activity
            }
        }, 2000);

        // Initial call to onActivityChange when component mounts
        const initialUpdateTimeout = setTimeout(() => {
            onActivityChange(isActive);
        }, 2000);

        return () => {
            clearInterval(interval); // Clean up interval
            clearTimeout(initialUpdateTimeout); // Clean up initial update timeout
        };
    }, [onActivityChange]); // Depend only on onActivityChange

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
            <div>Activity Monitor</div>
            <div>Current status: {isActive ? 'ACTIVE' : 'INACTIVE'}</div>
        </div>
    );
};

export default ActivityMonitor;

