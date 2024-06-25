import React from "react";

const LeftComponent = () => {
    return (
        <>
            <ul id="filetree">
                <li>
                    <i className="fa-regular fa-folder-open"></i>root
                    <ul>
                        <li>
                            <span></span>
                            <i className="fa-regular fa-folder-open"></i>folder-one
                            <ul>
                                <li>
                                    <i className="fa-brands fa-java"></i>folder-two
                                    <span></span>file_one.txt
                                </li>
                                <li>
                                    <i className="fa-brands fa-python"></i>folder-two
                                    <span></span>file_one.txt
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span></span>
                            <i className="fa-regular fa-folder-open"></i>folder-two
                            <ul>
                                <li>
                                    <i className="fa-regular fa-file"></i>folder-two
                                    <span></span>file_one.txt
                                </li>
                                <li>
                                    <i className="fa-regular fa-file"></i>folder-two
                                    <span></span>file_one.txt
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

        </>
    );
}

export default LeftComponent;
