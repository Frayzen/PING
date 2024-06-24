import React, { useEffect } from "react";
import * as bootstrap from 'bootstrap'

const AlertComponent = () => {
    useEffect(() => {
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')

        if (toastTrigger) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastTrigger.addEventListener('click', () => {
                toastBootstrap.show()
            })
        }
    }, []);
    return (
        <>
            <button type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1000" >
                    <div className="toast-header">
                        <img src="http://placehold.it/50x50" className="rounded me-2" alt="..."></img>
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>

        </>
    );
}

export default AlertComponent;
