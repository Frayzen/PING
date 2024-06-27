import React from "react";
import { adjustStats } from "../backend/stats";

const Profile = () => {
    return (
        <>
            <div id="profile" className="m-4">
                <div id="profile-picture" className="rounded-circle bg-dark me-auto my-1"></div>
                <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-danger" style={{ width: 75 + '%' }}></div>
                </div>
            </div>
        </>
    );
}

export default Profile;
