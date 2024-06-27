import React from "react";

const ProjectPicker = () => {
    return (
        <div className="m-auto col-md-6 col-lg-4 col-xl-3">
            <div class="card text-center w-100 p-4">
                <div class="card-body">
                    <h2 className="text-white">Open recent projects</h2>
                    <p class="card-text text-secondary my-4">
                        <ol class="list-group">
                            <li class="list-group-item btn border btn-secondary my-2">/usr/home/phonix/Code/PING/</li>
                            <li class="list-group-item btn border btn-secondary my-2">/usr/home/phonix/Code/ERO/</li>
                        </ol>
                    </p>
                    <hr className="w-25 m-auto my-4"></hr>
                    <h4 className="text-white my-4">or</h4>
                    <a href="#" class="btn btn-primary btn-lg">Open a new project</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectPicker;
