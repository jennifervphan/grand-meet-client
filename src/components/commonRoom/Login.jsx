import React from 'react';
    export default class Login extends React.Component {
        state = {
            username: ''
        };
        render() {
            return (
                <div class="loginToCommon">
                    <form className="loginToCommonForm" onSubmit={this.handleFormSubmit.bind(this)}>
                            <label>Welcome to the Common Room!</label>
                            <input placeholder='Enter your username' 
                                   value={this.state.username} 
                                   onChange={this.handleUsernameChange.bind(this)} />
                        <button type='submit'>Enter</button>
                    </form>  
                </div>
            );
        }
        handleUsernameChange(e) {
            this.setState({
                username: e.target.value
            });
        }
        handleFormSubmit() {
            if (this.state.username) {
                this.props.login(this.state.username);
            }
        }
    }
