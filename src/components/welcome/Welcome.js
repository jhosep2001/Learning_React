import React, {Component} from "react";
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newListName: "",
            newListNameError: false,
            listName: "",
            listNameError: false
        };
        this.nameInput = React.createRef();
        this.newListInput = React.createRef();
    }

    onChange = (event) => {
        let input= event.target.name;
        let error= event.target.name+"Error";
        this.setState({[input]: event.target.value, [error]: false});
    };

    newList= (event) => {
        if(!this.newListInput.current.value && this.newListInput.current.value === "") {
            event.preventDefault();
            event.stopPropagation();
            let error = this.newListInput.current.name + "Error";
            this.setState({[error]: true});
        }
        //validate not exist same name list
    };

    verifiedAdmin = (event) => {
        this.validate(event)
        //show popUp for password validation
    };

    validate = (event) => {
        if(!this.nameInput.current.value && this.nameInput.current.value === "") {
            event.preventDefault();
            event.stopPropagation();
            let error = this.nameInput.current.name + "Error";
            this.setState({[error]: true});
        }
    };

    render() {
        return(
            <>
                <div>
                    <MediaQuery query='(min-device-width: 1224px)'>
                        <div>
                            <h1>Create a new list, Just for pc</h1>
                            <input type="text"
                                   placeholder="Give us a name for your list"
                                   onChange={this.onChange}
                                   style={this.state.newListNameError ? this.inputStyleError :  this.inputStyle }
                                   ref={this.newListInput}
                                   name = "newListName"
                                   value={this.state.newListName}
                            />
                            <br/>
                            <Link to={"/videoList/"+this.state.newListName} onClick={this.newList}><button>Create</button></Link>
                        </div>
                    </MediaQuery>
                </div>
                <div>
                    <h1>Enter to a created List</h1>
                    <input type="text"
                           placeholder="Name of the list"
                           onChange={this.onChange}
                           style={this.state.listNameError ? this.inputStyleError:  this.inputStyle }
                           ref={this.nameInput}
                           name = "listName"
                           value={this.state.listName}
                    />
                    <br/>
                    <Link to={"/videoList/"+this.state.listName} onClick={this.verifiedAdmin} > <button>Admin</button> </Link>
                    <Link to={"/videoList/"+this.state.listName} onClick={this.validate} > <button>Collaborator</button> </Link>
                </div>
            </>
        );
    }

    inputStyle = {
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "5px",
            outline: "none"
    };

    inputStyleError = {
            border: "1px solid red",
            borderRadius: "5px",
            padding: "5px",
            outline: "none"
    };
}

export default Welcome;