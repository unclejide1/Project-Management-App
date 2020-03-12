import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {getProjectTask, updateProjectTask} from "../../../actions/backlogActions"

class UpdateProjectTask extends Component {
    constructor (){
        super()
        this.state= {
            "id": "",
            "projectSequence": "",
            "summary": "",
            "acceptanceCriteria": "",
            "priority": "",
            "dueDate": "",
            "createdAt": "",
            "projectIdentifier": "",
            "status": "",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }

        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            priority,
            dueDate,
            createdAt,
            projectIdentifier,
            status
    } = nextProps.project_task;

         this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            priority,
            dueDate,
            createdAt,
            projectIdentifier,
            status
        })
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const updateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            createdAt: this.state.createdAt,
            projectIdentifier: this.state.projectIdentifier,
            status: this.state.status
        }
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updateProjectTask, this.props.history)
    }

    componentDidMount(){
        const {backlog_id , pt_sequence} = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_sequence, this.props.history);
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to = {`/projectBoard/${this.state.projectIdentifier}/${this.state.projectSequence}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}{this.state.projectSequence}{" "}</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className = {classnames("form-control form-control-lg ", {"is-invalid":errors.summary})} name="summary" placeholder="Project Task summary" 
                            value ={this.state.summary}
                            onChange = {this.onChange}/>
                            {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"
                            value ={this.state.acceptanceCriteria}
                            onChange = {this.onChange}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="dueDate" 
                            value ={this.state.dueDate}
                            onChange = {this.onChange}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="priority"
                            value ={this.state.priority}
                            onChange = {this.onChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status"
                            value ={this.state.status}
                            onChange = {this.onChange}>
                                <option value="">Select Status</option>
                                <option value="PENDING">PENDING</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired, 
    errors: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    project_task: state.backlog.project_task,
    errors: state.errors
})
export default connect (mapStateToProps, {getProjectTask, updateProjectTask} ) (UpdateProjectTask);