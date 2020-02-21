import React from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from './components/project/AddProject'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/addProject" component={AddProject} />
    </div>
  </Router>
  );
}

export default App;
