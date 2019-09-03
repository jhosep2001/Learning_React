import React, {Component} from 'react';
import logo from "../../resources/icons/logo.svg";
import './Header.css';

class Header extends Component {

    headerText = () => {
        let url = window.location.pathname;
        if(url === ("/")) {
            return "Music Control React Project";
        } else {
            return url.split("/videoList/")[1] + " Video List";
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
