// import React, { Component } from 'react';
// import Talk from 'talkjs';

// export default class ChatApp extends Component {
//     constructor (props){
//         super (props);
//         this.inbox=undefined;
//     }
//     componentDidMount() {
//         // Promise can be `then`ed multiple times
//         Talk.ready
//             .then(() => {
//                 const me = new Talk.User({
//                     id: `${this.props.userInSession._id}`,
//                     name: `${this.props.userInSession.username}`,
//                     photoUrl: `${this.props.userInSession.profilePicUrl}`,
//                     welcomeMessage: "Hey there! How are you? :-)"
//                 });

//                 if (!window.talkSession) {
//                     window.talkSession = new Talk.Session({
//                         appId: "txjMxHYM",
//                         me: me
//                     });
//                 }

//                 const other = new Talk.User({
//                     id: `${this.props.location.chatPartner.user._id}`,
//                     name: `${this.props.location.chatPartner.user.username}`,
//                     photoUrl: `${this.props.location.chatPartner.user.profilePicUrl}`,
//                     welcomeMessage: "Hey there! Love to chat :-)"
//                 });

//                 // You control the ID of a conversation. oneOnOneId is a helper method that generates
//                 // a unique conversation ID for a given pair of users. 
//                 const conversationId = Talk.oneOnOneId(me, other);

//                 const conversation = window.talkSession.getOrCreateConversation(conversationId);
//                 conversation.setParticipant(me);
//                 conversation.setParticipant(other);

//                 this.inbox = window.talkSession.createInbox({
//                     selected: conversation
//                 });
//                 this.inbox.mount(this.container);

//             })
//             .catch(e => console.error(e));
//     }

//     componentWillUnmount() {
//         if (this.inbox) {
//             this.inbox.destroy();
//         }
//     }

//     render() {
//         return ( 
//             < span >
//             <div style = {{ height: '100vh' }} ref = { c => this.container = c }> Loading... 
//             </div> 
//             </span > );
//     }
// }




import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';
import axios from 'axios';

export default class ChatApp extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser:null,
            chatPartner: this.props.location.chatPartner.user,
            currentRoom: {users:[]},
            messages:[],
            users:[]
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount (){
        debugger
        axios.get(`${process.env.REACT_APP_API}/newChat`, 
        {withCredentials:true})
        .then(response => {
            let chatRooms= response.data;
            debugger
            let existRoom="";
            for (var i=0; i<chatRooms.length; i++){
                let usersInRoom = chatRooms[i]["member_user_ids"]
                for (var j=0; j<usersInRoom.length; j++){
                    debugger
                    if (usersInRoom[j]===this.state.chatPartner.username){
                        existRoom= chatRooms[i].id
                        debugger
                        break;
                    }
                }
            }

            const chatManager = new ChatManager({
                instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
                userId: this.props.userInSession.username,
                tokenProvider: new TokenProvider({
                    url: `${process.env.REACT_APP_API}/authenticate`

                    // url:`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/95077b15-c43c-4d68-ae92-7a1f082f91c8/token`
                })
                })
                debugger
            if (existRoom){
                debugger
                chatManager
                    .connect()
                    .then(currentUser => {
                        this.setState({
                            currentUser:currentUser
                        })
                        currentUser.subscribeToRoom({
                            roomId: `${existRoom}`,
                            messageLimit: 100,
                            hooks: {
                                onMessage: message => {
                                    this.setState({
                                        messages: [...this.state.messages, message]
                                    })
                                },
                            }})
                            .then(currentRoom => {
                            console.log(currentRoom.userIds);
                            this.setState({
                                currentRoom,
                                users: currentRoom.userIds
                            })
                            })
                            .catch(error => console.log(error))
            })} else {
                chatManager
                .connect()
                .then(currentUser => {
                    this.setState({
                        currentUser:currentUser
                    })

                    return currentUser.createRoom({
                        name: `${this.props.location.chatPartner.user.username}`,
                        private: true,
                        addUserIds: [ `${this.state.chatPartner.username}`],
                        customData: { foo: 42 },
                    })
                    .then(room => {
                        return currentUser.subscribeToRoom({
                            roomId: `${room.id}`,
                            messageLimit: 100,
                            hooks: {
                                onMessage: message => {
                                    this.setState({
                                        messages: [...this.state.messages, message]
                                    })
                                },
                            }})
                            .then(currentRoom => {
                            console.log(currentRoom.userIds);
                            this.setState({
                                currentRoom,
                                users: currentRoom.userIds
                            })
                            })
                            .catch(error => console.log(error))
            })})
         }
                
            // this.setState({chatRooms:chatRooms})
        })
    }
    
    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
    }

    render() {
        return (
            <>
                <MessageList messages={this.state.messages} {...this.props}/>
                <Input className="input-field" onSubmit={this.addMessage} />
            </>
        )
    }
}
