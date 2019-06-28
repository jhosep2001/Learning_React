import React, {Component} from 'react';
import logo from "../../logo.svg";
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-header-text">
                    Music Control React Project
                </h1>
            </header>
        );
    }
}

export default Header
