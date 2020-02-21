import React from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
    <Header/>
      <DashBoard/>
    </div>
  );
}

export default App;
