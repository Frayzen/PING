import React, { useEffect, useRef, useState } from 'react';
import MessagePopup from './popup/MessagePopup.jsx';    

const ActivityMonitor = ({ onActivityChange }) => {
    const [showPopup, setShowPopup] = useState(false);
    const inactiveTimeoutRef = useRef(null);

    useEffect(() => {
        const resetTimer = () => {
            if (inactiveTimeoutRef.current) {
                clearTimeout(inactiveTimeoutRef.current);
            }

            inactiveTimeoutRef.current = setTimeout(() => {
                setShowPopup(true); // Show popup after 2 seconds of inactivity
                onActivityChange(false);
            }, 2000);
        };

        const handleActivity = () => {
            setShowPopup(false); // Hide popup on activity
            onActivityChange(true);
            resetTimer();
        };

        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);
        document.addEventListener('click', handleActivity); // Add click event listener
        resetTimer();

        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keypress', handleActivity);
            document.removeEventListener('click', handleActivity);

            if (inactiveTimeoutRef.current) {
                clearTimeout(inactiveTimeoutRef.current);
            }
        };
    }, [onActivityChange]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {showPopup && <MessagePopup
                show={showPopup}
                handleClose={handleClosePopup}
                message="Why did you stop coding, you CUNT?"
                disableClose={true}
            />}
            <div>Activity Monitor</div>
        </div>
    );
};

export default ActivityMonitor;

