import axios from "axios";
import {SET_CURRENT_USER, GET_ERRORS} from "./types";
import setJwtToken from "../securityutils/setJwtToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("api/users/register", newUser);
        history.push("/signin");
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

export const login = loginRequest => async dispatch => {

    try{
 
        //post to login
        const res = await axios.post("api/users/login", loginRequest);
        //extract token
        const {token} = res.data;
        console.log(token)
        //store token in local storage
        localStorage.setItem("JwtToken", token);
        //set token in header
        setJwtToken(token);
        //decode token on react
        const decoded = jwt_decode(token);
        //dispatch to security reducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
          });
    } catch(err)
    {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}

export const logout = () => dispatch =>{
    localStorage.removeItem("JwtToken");
    setJwtToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
}