import React from 'react';
import Header from './components/header/Header.js';
import Visualizer from './components/visualizer/Visualizer.js';
import Queue from "./components/queue/Queue";


import './App.css';

function App() {
  return (
    <div className="App">
        <Header> </Header>
        <Visualizer></Visualizer>
        <Queue></Queue>
    </div>
  );
}

export default App;
