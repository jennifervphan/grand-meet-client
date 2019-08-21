import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';
import '../../pages/Inbox.css';

export default class EachRoom extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser:null,
            userInSession: JSON.parse(localStorage.getItem('user')),
            currentRoom: {users:[]},
            messages:[],
            users:[]
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            const {params}= this.props.match;
            let roomId=params.id
            const chatManager = new ChatManager({
                instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
                userId: this.state.userInSession.username,
                tokenProvider: new TokenProvider({
                    url: `${process.env.REACT_APP_API}/authenticate`
                })
            })
    
            chatManager
                    .connect()
                    .then(currentUser => {
                        debugger
    
                        this.setState({
                            currentUser:currentUser,
                            messages:[]
                        })
                        currentUser.subscribeToRoom({
                            roomId: `${roomId}`,
                            messageLimit: 50,
                            hooks: {
                                onMessage: message => {
                                    this.setState({
                                        messages: [...this.state.messages, message]
                                    })
                                },
                            }})
                            .then(currentRoom => {
                                debugger
                            console.log(currentRoom.userIds);
                            this.setState({
                                currentRoom,
                                users: currentRoom.userIds
                            })
                            this.props.setRoom(currentRoom)

                            })
                            .catch(error => console.log(error))
                        })
        }
    }

    componentDidMount (){
        debugger
        const {params}= this.props.match;
        let roomId=params.id
        const chatManager = new ChatManager({
            instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
            userId: this.state.userInSession.username,
            tokenProvider: new TokenProvider({
                url: `${process.env.REACT_APP_API}/authenticate`
            })
        })

        chatManager
                .connect()
                .then(currentUser => {
                    debugger

                    this.setState({
                        currentUser:currentUser,
                        message:[]
                    })
                    currentUser.subscribeToRoom({
                        roomId: `${roomId}`,
                        messageLimit: 50,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message]
                                })
                            },
                        }})
                        .then(currentRoom => {
                            debugger
                        this.setState({
                            currentRoom,
                            users: currentRoom.userIds
                        })
                        this.props.setRoom(currentRoom)
                        })
                        .catch(error => console.log(error))
    })}

    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
    }

    render() {
        debugger
        return (
            <div className="eachRoom"> 
                <MessageList messages={this.state.messages} userInSession={this.state.userInSession}/>           
                <Input className="input-field-one" onSubmit={this.addMessage} />            
            </div>
        )
    }
}
