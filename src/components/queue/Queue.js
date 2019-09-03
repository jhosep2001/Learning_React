import React, {Component} from 'react';
import './Queue.css';
import QueueItem from './item/QueueItem';


class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "queueVideos": [],
            "actualVideo": "PMivT7MJ41M"
        }
    };

    componentDidMount() {
        let videos = ["r2g0pM3PMNQ", "1Jw_mhoCiFY", "bE3ABNHDnAc"];
        this.setState({queueVideos: videos});
    }

    nextVideo = () => {
        let videoNext = this.state.queueVideos.findIndex(value => value === this.state.actualVideo);
        if(videoNext<this.state.queueVideos.length) {
            this.changeVideo(this.state.queueVideos[videoNext+1]);
        }
    };

    changeVideo = (videoId) => {
        this.props.changeVideo(videoId);
        this.setState({actualVideo: videoId});
        this.removeVideo(videoId);
    };

    removeVideo = (videoId) => {
        this.setState({queueVideos: this.state.queueVideos.filter(video => video !== videoId)});
    };

    render() {
        const items = this.state.queueVideos.map((video, videoId) => {
            return (
                <QueueItem changeVideo={this.changeVideo} removeVideo={this.removeVideo} key={videoId} videoId={video}></QueueItem>
            );
        });

        return (
            <div className="Main-Queue">
                <span>Next In List</span>
                <div>
                    <input className="searchInput" type="text" placeholder="Search"/>
                </div>
                {items}
            </div>
        );
    }

}

export default Queue;
