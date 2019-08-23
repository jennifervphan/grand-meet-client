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
            currentRoom: null,
            messages:[],
            users:[]
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            const {params}= this.props.match;
            // let roomId=params.id
            const chatManager = new ChatManager({
                instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
                userId: this.state.userInSession.username,
                tokenProvider: new TokenProvider({
                    url: `${process.env.REACT_APP_API}/authenticate`
                })
            })
    
            chatManager
                    .connect({
                        onRoomUpdated: room => {
                            const { rooms } = this.props;
                            const index = rooms.findIndex(r => r.id === room.id);
                            rooms[index] = room;
                            console.log(rooms)
                            this.setState({
                              rooms,
                            });
                          }
                    })
                    .then(currentUser => {    
                        this.setState({
                            currentUser:currentUser,
                            messages:[]
                        })
                        currentUser.subscribeToRoom({
                            roomId: `${params.id}`,
                            messageLimit: 50,
                            hooks: {
                                onMessage: message => {
                                    this.setState({
                                        messages: [...this.state.messages, message]
                                    })
                                    const { currentRoom } = this.state;

                                    if (currentRoom === null) return;

                                    return currentUser.setReadCursor({
                                        roomId: currentRoom.id,
                                        position: message.id,
                                    });
                                },
                            }})
                            .then(currentRoom => {
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
        const {params}= this.props.match;
        const chatManager = new ChatManager({
            instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
            userId: this.state.userInSession.username,
            tokenProvider: new TokenProvider({
                url: `${process.env.REACT_APP_API}/authenticate`
            })
        })

        chatManager
                .connect({
                    onRoomUpdated: room => {
                        const { rooms } = this.state;
                        const index = rooms.findIndex(r => r.id === room.id);
                        rooms[index] = room;
                        console.log("rooms on connect"+ rooms)
                        this.setState({
                          rooms,
                        });
                      }
                })
                .then(currentUser => {
                    this.setState({
                        currentUser:currentUser,
                        message:[]
                    })

                    currentUser.subscribeToRoom({
                        roomId: `${params.id}`,
                        messageLimit: 50,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message]
                                })

                                const { currentRoom } = this.state;

                                if (currentRoom === null) return;

                                return currentUser.setReadCursor({
                                    roomId: currentRoom.id,
                                    position: message.id,
                                });
                            },
                        }})
                        .then(currentRoom => {
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
        return (
            <div className="eachRoom"> 
                <MessageList messages={this.state.messages} userInSession={this.state.userInSession}/>           
                <Input className="input-field-one" onSubmit={this.addMessage} />            
            </div>
        )
    }
}
