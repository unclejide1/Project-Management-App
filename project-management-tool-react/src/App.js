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

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/addProject" component={AddProject} />
      <Route exact path="/updateproject/:id" component={updateProject} />
    </div>
  </Router>
  </Provider>
  );
}

export default App;
