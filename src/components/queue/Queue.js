import React, {Component} from 'react';
import './Queue.css';
import QueueItem from './item/QueueItem';


class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: "",
            queueVideos: [],
            actualVideo: ""
        }
    };

    componentDidMount() {
        fetch("http://localhost:8080/getQueue/"+this.props.listName, {method: "GET"})
            .then(function (response) {
                return response.json();
            }).then(data => {
                if(data.videosId.length > 0) {
                    let queueVideos = data.videosId.map( video => video.videoid);
                    this.setState({queueVideos});
                    fetch("http://localhost:8080/apiKey", {method: "GET"})
                        .then(response => response.json())
                        .then(data => {
                            this.setState({apiKey: data.key});
                        })
                        .catch(function (error) {
                            console.log("error getting apiKey");
                        });
                }
            })
            .catch(function (error) {
               console.log("Error getting queue for list", error);
            });
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
                <QueueItem apiKey={this.state.apiKey}
                           changeVideo={this.changeVideo}
                           removeVideo={this.removeVideo}
                           key={videoId}
                           videoId={video}>
                </QueueItem>
            );
        });

        const noContent =
            (<div className="EmptyQueue"> No Queue Videos on this List</div>);

        return (
            <div className="Main-Queue">
                <span>Next In List</span>
                <div>
                    <input className="searchInput" type="text" placeholder="Search"/>
                </div>
                {items.length > 0? items: noContent}
            </div>
        );
    }

}

export default Queue;
