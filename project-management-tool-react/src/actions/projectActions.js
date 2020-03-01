import axios from "axios";
import {GET_ERRORS, GET_PROJECT, DELETE_PROJECT} from "./types";
import {GET_PROJECTS} from "./types";



export const createProject = (project, history) => async dispatch => {
    try{
          await axios.post("/api/project", project)
        history.push("/dashboard");
        dispatch({
            type: GET_ERRORS,
            payload: {}
          });
    }catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
    }
}

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all")
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
}

export const getProject = (id, history) => async dispatch => {

    try{
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });

    }catch(err){
        alert("project with projectIdentifier: " + id + " does not exist, you will be redirected to your dash board")
        history.push("/dashboard");
    }
}

export const deleteProject = id => async dispatch =>{
    if(window.confirm("Are you sure you want to delete this project? It will delete all data related to it")){
        await axios.delete(`/api/project/${id}`);
    dispatch({
        type: DELETE_PROJECT,
        payload: id
    });
    }
    
}