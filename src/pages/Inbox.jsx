import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import AllRooms from '../components/message/AllRooms';
import EachRoom from '../components/message/EachRoom';
import MainLayout from '../components/layout/MainLayout'
import './Inbox.css';

export default class Inbox extends Component {
    constructor(props){
        super(props);
        this.state={
            chatRooms:[],
            currentUser: JSON.parse(localStorage.getItem('user')), 
            currentRoom:{}
        };
        this.setCurrentRoom= this.setCurrentRoom.bind(this);
    }

    componentDidMount (){
        axios.get(`${process.env.REACT_APP_API}/inbox`, 
                    {withCredentials:true})
        .then(response => {
                let chatRooms= response.data;
                this.setState({chatRooms:chatRooms})
    })
    }

    setCurrentRoom= (room)=>{
        this.setState({
            currentRoom: room
        })
    }

    render() {
        return (
            <MainLayout {...this.props} className="Dashboard">
                <div className="inboxPage">
                <AllRooms rooms={this.state.chatRooms} currentUser={this.state.currentUser} currentRoom={this.state.currentRoom}/>
                <Route path="/inbox/:id" render={(props)=><EachRoom rooms={this.state.chatRooms} userInSession={this.state.currentUser} setRoom={this.setCurrentRoom} {...props}/>}/>
                </div>
            </MainLayout>
        )
    }
}
