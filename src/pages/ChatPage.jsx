import React, { Component } from 'react';
import ChatApp from '../components/message/ChatApp';
import MainLayout from '../components/layout/MainLayout';

export default class ChatPage extends Component {
    render() {
        return (
            <MainLayout {...this.props}>
                <ChatApp {...this.props}/>
            </MainLayout>
        )
    }
}
