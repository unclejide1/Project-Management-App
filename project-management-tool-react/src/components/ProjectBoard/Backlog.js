import React, { Component } from 'react';

import ProjectTask from './ProjectTask/ProjectTask';

 class Backlog extends Component {
    render() {
        const {project_tasks} = this.props;

        const tasks = project_tasks.map(project_task => (
            <ProjectTask key = {project_task.id} project_task = {project_task}/>
        ));

        let pendingItems = [];
        let inProgressItems = [];
        let doneItems = [];

        for(let iterator = 0; iterator< tasks.length; iterator++){
            if(tasks[iterator].props.project_task.status === "PENDING"){
                pendingItems.push(tasks[iterator]);
            }
            if(tasks[iterator].props.project_task.status === "IN_PROGRESS"){
                inProgressItems.push(tasks[iterator]);
            }
            if(tasks[iterator].props.project_task.status === "DONE"){
                doneItems.push(tasks[iterator]);
            }
        }
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>PENDING</h3>
                        </div>
                    </div>
                    {pendingItems}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inProgressItems}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneItems}
                </div>
            </div>
        </div>
        )
    }
}

export default Backlog;