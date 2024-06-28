import React, { useContext } from "react";
import { ProjectManagerContext } from "../../managers/projectManager";
import * as bootstrap from "bootstrap";
import { Toast, TOAST_STATUS } from "bootstrap-toaster";


const ProjectPicker = () => {
    const projectManager = useContext(ProjectManagerContext);
    return (
        <div className="m-auto col-md-6 col-lg-4 col-xl-3">
            <div className="card text-center w-100 p-4">
                <div className="card-body">
                    <h2 className="text-white">Open recent projects</h2>
                    <p className="card-text text-secondary my-4">
                        <ol className="list-group">
                            <li className="list-group-item btn border btn-secondary my-2">/usr/home/phonix/Code/PING/</li>
                            <li className="list-group-item btn border btn-secondary my-2">/usr/home/phonix/Code/ERO/</li>
                        </ol>
                    </p>
                    <hr className="w-25 m-auto my-4"></hr>
                    <h4 className="text-white my-4">or</h4>
                    <a onClick={
                        () => {
                            window.api.getProjectPath().then((path) => {
                                if (path != undefined)
                                    projectManager.setCurrent(path);
                                else {
                                    Toast.create({
                                        title: "Invalid path",
                                        message: "Please provide a valid path",
                                        status: TOAST_STATUS.DANGER,
                                        timeout: 1000
                                    })
                                }


                            });
                        }
                    } href="#" className="btn btn-primary btn-lg">Open a new project</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectPicker;
