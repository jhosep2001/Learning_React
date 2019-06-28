import React, { Component } from "react";
import YouTube from 'react-youtube';

import './Visualizer.css';

class Visualizer extends Component {
    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        return(
          <div className="Main-Visualizer">
              <YouTube
                  videoId="Q3JBvLOzL0o"
                  opts={opts}
                  onReady={this._onReady}
              />
          </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default Visualizer
