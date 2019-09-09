import React, {Component} from 'react';
import './QueueItem.css';


class QueueItem extends Component {
    url = "https://www.googleapis.com/youtube/v3";
    state = {
        data: {},
        videoImage: "",
        videoName: "",
        votes: 0
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.videoId !== this.props.videoId || prevProps.apiKey !== this.props.apiKey) {
            this.getVideoInfo();
        }
    }

    componentDidMount() {
        this.getVideoInfo();
     }

    getVideoInfo = () => {
        if(this.props.apiKey && this.props.apiKey !== "") {
            let param = "id="+this.props.videoId+"&part=snippet&maxResult=1&key="+this.props.apiKey;
            fetch(this.url+'/videos?'+param)
                .then(response => response.json())
                .then(data => {
                    this.setState({data});
                    this.setState({videoImage: data.items[0].snippet.thumbnails.high.url});
                    this.setState({videoName: data.items[0].snippet.title});
                });
        }
    };

     changeVideo = () => {
         this.props.changeVideo(this.props.videoId);
     };

     removeVideo = () => {
        this.props.removeVideo(this.props.videoId);
     };

    render() {
        return (
            <div className='QueueItem'>
                  <div onClick={this.changeVideo}>
                      <div className="itemImage">
                        <img src={this.state.videoImage} alt="No available"/>
                    </div>
                    <div className="itemName">
                        {this.state.videoName}
                    </div>
                  </div>
                <div>
                    <div>
                        <div className="itemPoints">{this.state.votes}</div>
                    </div>
                    <div>
                        <div className="itemDelete" onClick={this.removeVideo}>x</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QueueItem;
