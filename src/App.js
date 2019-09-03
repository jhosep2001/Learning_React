import Header from './components/header/Header.js';
import Visualizer from './components/visualizer/Visualizer.js';
import Queue from "./components/queue/Queue";
import Welcome from "./components/welcome/Welcome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import React, { Component} from 'react';
import MediaQuery from "react-responsive";

class App extends Component {
    constructor(props){
      super(props);
      this.visualizer = React.createRef();
      this.queue = React.createRef();
      fetch("http://localhost:8080/", {
          mode: "cors",
          method: "GET"
      })
          .then(response => response.json())
          .then(data => {
              console.log(data)
          });
    }

    changeVideo = (videoId) => {
        this.visualizer.current.changeVideo(videoId);
    };

    nextVideo = () => {
        this.queue.current.nextVideo();
    };

  render() {
        return (
            <div className="App">
                <div className="modal">
                    <Router>
                        <Switch>
                            <Route path="/" exact>
                                <Header></Header>
                                <Welcome></Welcome>
                            </Route>
                            <Route path="/videoList/:id">
                                <Header ></Header>
                                <div className="Content">
                                    <MediaQuery query='(min-device-width: 1224px)'>
                                        <Visualizer nextVideo={this.nextVideo} ref={this.visualizer}></Visualizer>
                                    </MediaQuery>
                                    <Queue changeVideo={this.changeVideo} ref={this.queue}></Queue>
                                </div>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
  }
}

export default App;
