import React, { Component } from "react";
import YouTube from 'react-youtube';

import './Visualizer.css';

class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: "PMivT7MJ41M"
        };
        this.player = React.createRef(YouTube);
    }

    playVideo = () => {
        this.player.current.internalPlayer.playVideo();
    };

    pauseVideo = () => {
        this.player.current.internalPlayer.pauseVideo();
    };

    nextVideo = () => {
        this.props.nextVideo();
    };

    changeVideo = (videoId) => {
        this.setState({videoId: videoId});
    };

    _onReady = () => {
        // access to player in all event handlers via event.target
        this.player.current.internalPlayer.pauseVideo();
    };

    _onEnd = () => {
        // access to player in all event handlers via event.target
        this.nextVideo();
    };

    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                color: 'white',
                controls: 0,
                iv_load_policy: 3,
                rel: 0,
                showinfo: 0,
            }
        };

        return(
            <div className="VideoContainer">
                <div className="Main-Visualizer">
                    <YouTube
                        id="video"
                        videoId={this.state.videoId}
                        opts={opts}
                        onReady={this._onReady}
                        onEnd={this._onEnd}
                        ref={this.player}
                    />
                </div>
                <ul>
                    <li onClick={this.pauseVideo}><button className="pause">Stop</button></li>
                    <li onClick={this.playVideo}><button className="play">Play</button></li>
                    <li onClick={this.nextVideo}><button className="next">Next</button></li>
                </ul>
            </div>
        );
    }
}

export default Visualizer