import React, { useEffect, useState } from "react";
import { adjustBoost } from "../backend/stats";
import ActivityMonitor from "./activityComponent.jsx"; // Adjust path as per your file structure

const Profile = () => {
    const [xpBoost, setXpBoost] = useState(0);
    const [progress, setProgress] = useState(75); // Initial progress value

    const handleActivityChange = (isActive) => {
        var newBoost = adjustBoost(xpBoost, 1, isActive);
        setProgress(prevProgress => Math.min(prevProgress + newBoost, 100));
        setXpBoost(newBoost);
        console.log("new boost = ",newBoost);
        console.log("progress = ",progress);
    };

    useEffect(() => {
        // setProgress(prevProgress => Math.min(prevProgress * xpBoost, 100));
    }, [xpBoost]);

    return (
        <>
            <div id="profile" className="m-4">
                <div id="profile-picture" className="rounded-circle bg-dark me-auto my-1"></div>
                <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-danger" style={{ width: progress + '%' }}></div>
                </div>
            </div>
            <ActivityMonitor onActivityChange={handleActivityChange} />
        </>
    );
}

export default Profile;

