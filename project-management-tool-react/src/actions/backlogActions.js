import axios from "axios";
import {GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK} from "./types";

export const addProjectTask = (backlog_id,project_task, history) => async dispatch => {
    try{
        await axios.post(`/api/project-task/${backlog_id}`, project_task)
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
          });
    }catch (error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          });

    }
};

export const getBacklog = backlog_id => async dispatch => {
    try{
        const res = await axios.get(`/api/project-task/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });

    }
}

export const getProjectTask = (backlog_id, pt_sequence, history) => async dispatch =>{
    try{
     const res = await axios.get(`/api/project-task/${backlog_id}/${pt_sequence}`);
     dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
    }); 
    }catch (error){
        alert("project with projectIdentifier: " + backlog_id + " or project task: " + pt_sequence +  " does not exist, you will be redirected to your project-board")
        history.push(`/projectBoard/${backlog_id}`);

    }
}
 
export const updateProjectTask = (backlog_id, pt_sequence, project_task,history ) => async dispatch => {
try {
    await axios.patch(`/api/project-task/${backlog_id}/${pt_sequence}`, project_task);
    history.push(`/projectBoard/${backlog_id}`)
    dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    
} catch (error) {
    dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
}
}

export const deleteProjectTask = (backlog_id, pt_sequence) => async dispatch =>{
    if(window.confirm("Are you sure you want to delete this project? " + pt_sequence + " It will delete all data related to it")){
        await axios.delete(`/api/project-task/${backlog_id}/${pt_sequence}`);
    dispatch({
        type: DELETE_PROJECT_TASK,
        payload: pt_sequence
    });
    }
    
}