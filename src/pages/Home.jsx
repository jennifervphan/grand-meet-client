import React, { Component } from 'react';
import MainLayout from '../components/layout/MainLayout';
import {Link} from 'react-router-dom';
import "./Home.css";

export default class Home extends Component {
    render() {
        if (this.props.userInSession){
            return (
                <div className="Homepage">
                <MainLayout {...this.props}>
                    <div className="welcomeInfo">
                    <h1>talk.share.meet.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    </p>
                    </div>
                </MainLayout>
                </div>
            )
        }else {
            return (
            <div className="Homepage">
            {/* <MainLayout {...this.props}> */}
            <nav className="Navbar">
            <Link to="/" style={{textDecoration:"none", color: "white"}}><h3>grandMeet</h3></Link>
            <Link to='/login' style={{ textDecoration: 'none', color:"white"}}><h3>Login</h3></Link>
            </nav>
                <div className="welcomeInfo">
                <h1>talk.share.meet.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                <Link to='/signup' style={{ textDecoration: 'none' }}><button className="registerBtnHome">Register</button></Link>
                </div>
            {/* </MainLayout> */}
            </div>
        ) 
        }   
    }
}
