import React, { useContext } from "react";
import { ProjectManagerContext } from "../../managers/projectManager";
import * as bootstrap from "bootstrap";
import { PersistentManagerContext } from "../../managers/persistentManager";
import { Toast, TOAST_STATUS } from "bootstrap-toaster";


const ProjectPicker = () => {
    const projectManager = useContext(ProjectManagerContext);
    const persistentManager = useContext(PersistentManagerContext);
    console.log(persistentManager.projects);
    return (
        <div className="m-auto col-md-6 col-lg-4 col-xl-3">
            <div className="card text-center w-100 p-4">
                <div className="card-body">
                    {persistentManager.projects.length > 0 &&
                        <>
                            <h2 className="text-white">Open recent projects</h2>
                            <div className="card-text text-secondary my-4">

                                {persistentManager.projects.map((project, index) => {
                                    return (
                                        <button type="button" className="btn btn-dark border w-100 my-1" onClick={() => {
                                            projectManager.openProject(project);
                                        }}>{project}</button>
                                    );
                                })}
                            </div>
                            <hr className="w-25 m-auto my-4"></hr>
                            <h4 className="text-white my-4">or</h4>
                        </>
                    }
                    {persistentManager.projects.length == 0 &&
                        <>
                            <h2 className="text-white">No recent projects</h2>
                            <hr className="w-25 m-auto my-4"></hr>
                        </>
                    }
                    <a onClick={
                        () => {
                            projectManager.selectProject((path) => {
                                if (path == undefined) {

                                    Toast.create({
                                        title: "Invalid path",
                                        message: "Please provide a valid path",
                                        status: TOAST_STATUS.DANGER,
                                        timeout: 1000
                                    })
                                    return;
                                }
                                projectManager.openProject(path);
                                persistentManager.addProject(path);
                            });
                        }
                    } href="#" className="btn btn-primary btn-lg">Open a new project</a>
                </div>
            </div>
        </div >
    );
}

export default ProjectPicker;
