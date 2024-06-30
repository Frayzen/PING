import React, { useEffect, useState } from "react";
import armadillo from '../../public/armadillo.png';
import chief from '../../public/chief.png';
import fatcheetah from '../../public/fatcheetah.png';
import florian from '../../public/florian.png';
import snoop from '../../public/snoop.png';
import rabbit from '../../public/rabbit.png';
import sloth from '../../public/sloth.png';

import { ActivityManager } from "../managers/activityManager.js";

const Profile = () => {
    const activityManager = React.useContext(ActivityManager);
    const [active, setActive] = useState(true);
    useEffect(() => {
        return async () => {
            var imgs = [sloth, snoop, fatcheetah, florian, chief, rabbit];
            const profilePicture = document.getElementById('profile-picture');
            let i = (activityManager.xp - (activityManager.xp % 100)) / 100;
            profilePicture.style.backgroundImage = `url(${imgs[i % imgs.length]})`;
        }
    }, [activityManager.xp]);

    return (
        <>
            <div id="profile" className="m-4 d-flex align-items-center">
                <div id="profile-picture" className="rounded-circle bg-dark me-3" style={{
                }}></div>
                <div className="flex-grow-1">
                    <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow={activityManager.xp} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-danger" style={{
                            width: (activityManager.xp % 100) + '%',
                        }}></div>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex">
                            <p className="mb-0">XP Boost: x{activityManager.xpBoost} </p>
        <div className="flex-grow-1"></div>
                            {!activityManager.active && (
                                <span class="badge text-bg-danger">Inactive</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

