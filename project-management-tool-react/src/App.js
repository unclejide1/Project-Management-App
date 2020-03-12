import React from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from './components/project/AddProject'
import {Provider} from 'react-redux';
import store from './store'
import updateProject from './components/project/updateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTask/UpdateProjectTask'
import Landing from './components/layout/Landing';
import SignUp from './components/userManagement/SignUp';
import SignIn from './components/userManagement/SignIn';
import jwt_decode from "jwt-decode";
import setJwtToken from "./securityutils/setJwtToken";
import { SET_CURRENT_USER } from './actions/types';
import {logout} from "./actions/SecurityActions";
import SecuredRoute from "./securityutils/SecuredRoute"

const JwtToken = localStorage.JwtToken;
if(JwtToken){
  setJwtToken(JwtToken);
  const decoded_token = jwt_decode(JwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_token
  })

  const currentTime = Date.now()/1000;
  if(decoded_token.exp < currentTime){
    store.dispatch(logout());
    window.location.href = "/";
  } 

}


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/signup" component = {SignUp}/>
      <Route exact path = "/signin" component = {SignIn}/>


      <Switch>
      <SecuredRoute exact path="/dashboard" component={DashBoard} />
      <SecuredRoute exact path="/addProject" component={AddProject} />
      <SecuredRoute exact path="/updateproject/:id" component={updateProject} />
      <SecuredRoute exact path="/projectBoard/:id" component = {ProjectBoard}/>
      <SecuredRoute exact path="/addProjectTask/:id" component = {AddProjectTask}/>
      <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_sequence" 
      component = {UpdateProjectTask}/>
      </Switch>
    </div>
  </Router>
  </Provider>
  );
}

export default App;
