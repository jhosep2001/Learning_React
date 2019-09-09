import React, {Component} from 'react';
import logo from "../../resources/icons/logo.svg";
import './Header.css';

class Header extends Component {

    headerText = () => {
        let name = this.props.listName;
        if(name === "") {
            return "Music Control React Project";
        } else {
            return name+" Video List";
        }

    };

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-header-text">
                    {this.headerText()}
                </h1>
            </header>
        );
    }
}

export default Header
