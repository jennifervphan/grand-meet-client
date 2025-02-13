import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllRooms.css';

export default class AllRooms extends Component {
    constructor (props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem('user')),
            otherUsers:JSON.parse(localStorage.getItem('nearbyUsers'))
        }
    }
    
    render() {
        const {rooms} =this.props
    
        if(this.state.otherUsers){
            let eachRoom= rooms.map((room, index)=>{
                        let roomName= room["member_user_ids"].filter(id => id !== this.state.user.username)[0]
                        let partner= this.state.otherUsers.filter(user => user.username=== roomName)[0]
                        const isRoomActive = room.id === this.props.currentRoom.id ? 'active' : '';   
                        return(
                            <Link className="eachRoom" to={`/inbox/${room.id}`} key={index}>
                            <li className={isRoomActive} key={room.id}>
                                <div className="inboxList">
                                <div className="eachMesDiv" style={{backgroundImage: `url(${partner.profilePicUrl})`}}>
                                </div>
                                {roomName}
                                {room.unread_count > 0 ? (
                                    <span className="room-unread">{room.unread_count}</span>
                                ): null}
                                </div>
                            </li>
                            </Link>
                        )
                    })
                    return (
                        <ul className="roomsTab">
                        {eachRoom}   
                        </ul>
                    )
        } else{
            return(
                <div>
                    No messages, search for nearby user to chat with!
                </div>
            )
        }
        
    }
}
