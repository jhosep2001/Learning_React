import Header from './components/header/Header.js';
import Visualizer from './components/visualizer/Visualizer.js';
import Queue from "./components/queue/Queue";
import Welcome from "./components/welcome/Welcome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import React, { Component} from 'react';
import MediaQuery from "react-responsive";

class App extends Component {
    state = {
        listName: ""
    };

    constructor(props){
      super(props);
      this.visualizer = React.createRef();
      this.queue = React.createRef();
    }

    changeList = (listName) => {
        this.setState({listName})
    };

    changeVideo = (videoId) => {
        this.visualizer.current.changeVideo(videoId);
    };

    nextVideo = () => {
        this.queue.current.nextVideo();
    };

  render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Header listName={this.state.listName}></Header>
                            <Welcome changeList={this.changeList}></Welcome>
                        </Route>
                        <Route path="/videoList/:id">
                            <Header listName={this.state.listName}></Header>
                            <div className="Content">
                                <MediaQuery query='(min-device-width: 1224px)'>
                                    <Visualizer nextVideo={this.nextVideo} ref={this.visualizer}></Visualizer>
                                </MediaQuery>
                                <Queue
                                    listName={this.state.listName}
                                    changeVideo={this.changeVideo}
                                    ref={this.queue}>
                                </Queue>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
  }
}

export default App;
