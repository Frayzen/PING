import React, { useEffect, useRef, useState } from 'react';
import MessagePopup from './popup/MessagePopup.jsx'; // Adjust path as per your file structure

const ActivityMonitor = () => {
    const [showPopup, setShowPopup] = useState(false);

    const inactiveTimeoutRef = useRef(null);

    useEffect(() => {
        const resetTimer = () => {
            if (inactiveTimeoutRef.current) {
                clearTimeout(inactiveTimeoutRef.current);
            }

            inactiveTimeoutRef.current = setTimeout(() => {
                setShowPopup(true); // Show popup after 5 seconds of inactivity
            }, 2000);
        };

        const handleActivity = () => {
            setShowPopup(false); // Hide popup on activity
            resetTimer();
        };

        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);
        resetTimer();

        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keypress', handleActivity);
            document.addEventListener('click', handleActivity); // Add click event listener

            if (inactiveTimeoutRef.current) {
                clearTimeout(inactiveTimeoutRef.current);
            }
        };
    }, []);

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

