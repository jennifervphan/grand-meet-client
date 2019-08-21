import React from 'react';
import { Grid, List, Comment, Form, Input } from 'semantic-ui-react';
import GameBoard from './GameBoard';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.room.userIds,
            messages: [],
            newMessage: ''
        };

        props.user.subscribeToRoom({
            roomId: props.room.id,
            messageLimit: 50,
            hooks: {
                onUserJoined: (user) => {
                    this.setState({
                        users: props.room.users
                    });
                },
                onUserLeft: (user) => {
                    this.setState({
                        users: props.room.users
                    });
                },
                onMessage: (message) => {
                    const messages = this.state.messages;
                    let opponent;
                    if (message.attachment && message.attachment.link && message.attachment.link.startsWith('urn:player:')) {
                        opponent = message.attachment.link.substring(11);
                        if (opponent !== props.user.id) {
                            opponent = undefined;
                        }
                    }
                    messages.push({
                        id: message.id,
                        user: message.senderId,
                        message: this.state.newMessage,
                        opponent: opponent
                    });
                    this.setState({
                        messages: [...messages, message]
                    });
                }
            }
        })
        .then(currentRoom=>{
            this.setState({user: currentRoom.userIds})
        })
    }

    render() {
        const users = this.state.users
            .filter((user) => user.id !== this.props.user.id)
            .map((user) => (
                <li style={{listStyle:"none"}} key={user.id}>
                    <b style={{margin: "0", padding:"0"}}>
                        { user.name }
                    </b>
                    <p style={{floated:'right'}}>
                        <a onClick={() => this._challengePlayer(user)}>Challenge</a>
                    </p>
                </li>
            ));

        const messages = this.state.messages
            .map((message) => {
                let acceptGame;
                if (message.opponent) {
                    acceptGame = (
                            <a onClick={() => this._acceptChallenge(message.user)}>Accept Challenge</a>
                    );
                }
                return (
                    // <div key={message.id}>
                        <div className="columnFlex">
                            <h4 className="flexpart">{ message.user}</h4>
                            <p className="flexpart">{ message.text }</p>
                            { acceptGame }
                        </div>
                    // </div>
                );
            });

        return (
            <>
                <div className="rowFlex">
                    <div className="allMessages">
                        { this.props.game && <GameBoard room={this.props.game} user={this.props.user} ref={(child) => { this._gameBoard = child; }}/> }
                        <div className="ColumnFlex" >
                            { messages }
                        </div>
                        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />
                    </div>
                    <div className="availableUsers">
                        <ul>
                            <li style={{listStyle:"none"}}>
                                <b>
                                   You: { this.props.user.name }
                                </b>
                            </li>
                            { users }
                        </ul>
                    </div>
                </div>
                <div>
                    <Form onSubmit={this._handleSubmit.bind(this)}>
                        <input className="typeText" type="text" placeholder='New Message...' value={this.state.newMessage} onChange={this._handleNewMessageChange.bind(this)} />
                    </Form>
                </div>
            </>
        );
    }

    componentDidMount() {
        this._scrollToBottom();
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    _scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    _handleNewMessageChange(e) {
        this.setState({
            newMessage: e.target.value
        });
    }

    _handleSubmit() {
        const { newMessage } = this.state;
        const { user, room } = this.props;
        user.sendMessage({
            text: newMessage,
            roomId: room.id
        });
        this.setState({
            newMessage: ''
        });
    }

    _challengePlayer(player) {
        const { user, room } = this.props;
        user.sendMessage({
            text: `I challenge ${player.name} to a game`,
            roomId: room.id,
            attachment: {
                link: `urn:player:${player.id}`,
                type: 'file',
                fetchRequired: false
            }
        });
    }

    _acceptChallenge(player) {
        const { user } = this.props;
        user.createRoom({
            name: `${user.id} vs ${player}`,
            addUserIds: [player]
        }).then((room) => {
            this.props.startedGame(room.id, user.id, player);
        });
    }

    getPlayersInRoom() {
        const players = this._gameBoard ? this._gameBoard.getPlayers() : [];
        const playersInRoom = this.state.users
            .filter((user) => players.includes(user.id));
        return playersInRoom;
    }
}