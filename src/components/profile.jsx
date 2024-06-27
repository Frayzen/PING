import React, { useEffect } from 'react';
import { ActivityManager } from "../managers/activityManager.js";

const Profile = () => {
    const activityManager = React.useContext(ActivityManager);

    useEffect(() => {
        return async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            document.getElementById("profile-picture").style.background = `url("~/public/armadillo.png")`;
            alert("background changed");
        }
    }, []);

    return (
        <>
            <div id="profile" className="m-4 d-flex align-items-center">
                <div id="profile-picture" className="rounded-circle bg-dark me-3" style={{
                    // background: `url("src/media/images/armadillo.png")`
                }}></div>
                <div className="flex-grow-1">
                    <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow={activityManager.xp} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-danger" style={{
                            width: activityManager.xp + '%',
                        }}></div>
                    </div>
                    <div className="mt-1">
                        {activityManager.xpBoost >= 1 && (
                            <p className="mb-0">XP Boost: x{activityManager.xpBoost}</p>
                        )}
                        {activityManager.xpBoost < 1 && (
                            <span class="badge text-bg-danger">Inactive</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

