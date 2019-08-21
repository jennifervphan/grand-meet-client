import React, { Component } from 'react';
import Nav from '../navbar/Navbar';
import './MainLayout.css';

export default class MainLayout extends Component {
    render() {
        return (
            <div className="MainLayout">
                <Nav {...this.props}/>
                {this.props.children}
            </div>
        )
    }
}
