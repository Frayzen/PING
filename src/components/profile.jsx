import React from 'react';
import { ActivityManager } from "../managers/activityManager.js";

const Profile = () => {
    const activityManager = React.useContext(ActivityManager);
    return (
        <>
            <div id="profile" className="m-4 d-flex align-items-center">
                <div id="profile-picture" className="rounded-circle bg-dark me-3"></div>
                <div className="flex-grow-1">
                    <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow={activityManager.xp} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-danger" style={{ width: activityManager.xp + '%' }}></div>
                    </div>
                    <div className="mt-1">
                        <p className="mb-0">XP Boost: {activityManager.xpBoost}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

