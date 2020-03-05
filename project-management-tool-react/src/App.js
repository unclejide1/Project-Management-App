import React from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
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


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/signup" component = {SignUp}/>
      <Route exact path = "/signin" component = {SignIn}/>



      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/addProject" component={AddProject} />
      <Route exact path="/updateproject/:id" component={updateProject} />
      <Route exact path="/projectBoard/:id" component = {ProjectBoard}/>
      <Route exact path="/addProjectTask/:id" component = {AddProjectTask}/>
      <Route exact path="/updateProjectTask/:backlog_id/:pt_sequence" 
      component = {UpdateProjectTask}/>
    </div>
  </Router>
  </Provider>
  );
}

export default App;
