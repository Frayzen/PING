import React from "react";
import AlertComponent from "./alertComponent.jsx";

const RightComponent = () => {
    return (
        <>
        <ul className="nav nav-tabs border-0 align-self-end mt-1">
            <li className="nav-item flex-grow-0 p-1 border-bottom">
            </li>
            <li className="nav-item rounded-top border-1 border">
                <a className="nav-link active bg-body-tertiary text-white border-0" href="#">File 1</a>
            </li>
            <li className="nav-item ">
                <a className="nav-link bg-body-tertiary border-0 text-white border-bottom" href="#">File 1</a>
            </li>
            <li className="nav-item flex-grow-1 border-bottom">
            </li>
        </ul>
        <AlertComponent />
        </>
    );
}

export default RightComponent;
