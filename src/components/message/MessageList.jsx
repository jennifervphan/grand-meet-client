import React, { Component } from 'react';
import "./MessageList.css";

export default class MessageList extends Component {
   
    render() {
        let eachMess= this.props.messages.map((message, index)=>{
            if(message.senderId === this.props.userInSession.username){
                return(
                    <div key={index} className="currentUserDiv" >
                        {/* <div className="eachMes"> */}
                        {/* <div className="eachMesDiv" style={{backgroundImage: `url(${this.props.userInSession.profilePicUrl})`}}> */}
                        {/* </div> */}
                        <p className="currentUser">{message.text}</p>
                        {/* <div style={{ float:"left", clear: "both" }}  ref={(el) => { this.messagesEnd = el; }} ></div> */}
                        {/* </div> */}
                    </div>
                    )
            }
            else{
                return(
                    <div key={index} >
                        {/* <div className="eachMes">                        */}
                        {/* <div className="eachMesDiv" style={{backgroundImage: `url(${this.props.location.chatPartner.user.profilePicUrl})`}}> */}
                        {/* </div> */}
                        <p className="chatPartner">{message.text}</p>
                        {/* </div> */}
                    </div>
                )
            }
            
            
        })
        return (
            <div className="MessageList">
                {eachMess}
            </div>
        )
    }
   
}
