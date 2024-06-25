import React, { useEffect } from "react";
import * as bootstrap from 'bootstrap'

const AlertComponent = ({ title, time, content }) => {
    useEffect(() => {
        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }, []);
    return (
        <>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1000" >
                    <div className="toast-header">
                        <img src="http://placehold.it/50x50" className="rounded me-2" alt="..."></img>
                        <strong className="me-auto">{ title }</strong>
                        <small>{ time }</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>

                    <div className="toast-body">
                        { content }
                    </div>
                </div>
            </div>

        </>
    );
}

export default AlertComponent;
