import React, { useEffect } from "react";
import img from '../../public/armadillo.png';

const Profile = () => {
    useEffect(() => {
        return async () => {
            // wait 1sec
            await new Promise(resolve => setTimeout(resolve, 2000));
            const profilePicture = document.getElementById('profile-picture');
            profilePicture.style.backgroundImage = `url('public/armadillo.png')`;
            console.log(profilePicture);
        }
    }, []);
    return (
            <div id="profile" className="mx-4 w-100">
                <div className="d-flex align-items-center">
                    <div id="profile-picture" className="col-5 rounded-circle bg-dark me-auto my-1"></div>
                    <div className="mx-0 mr-auto w-auto">
                        <h5 className="card-title">Sloth</h5>
                        <hr className="my-1"></hr>
                        <span className="badge text-bg-secondary">Level 53</span>
                    </div>
                </div>
                <div className="progress border" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-white" style={{ width: 75 + '%' }}></div>
                </div>
            </div>
    );
}

export default Profile;

