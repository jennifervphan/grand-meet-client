import React, {Component} from 'react';
import { Smile } from 'react-feather';
import { Picker } from 'emoji-mart';
import {
    addEmoji,
    toggleEmojiPicker,
  } from '../../method';
import 'emoji-mart/css/emoji-mart.css';
import "./Input.css";

    class Input extends Component {
        constructor(props) {
            super(props);
            this.state = {
                message: "",
                showEmojiPicker: false,
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.addEmoji = addEmoji.bind(this);
            this.toggleEmojiPicker = toggleEmojiPicker.bind(this);
        }
        handleChange(e) {
            this.setState({
                message: e.target.value
            })
        }
        handleSubmit(e) {
            e.preventDefault();
            this.props.onSubmit(this.state.message);
            this.setState({
                message: ''
            })
        }
        render() {
            const {showEmojiPicker} = this.state; 
            return (
                <>
                    {showEmojiPicker ? (
                        <Picker set="emojione" onSelect={this.addEmoji} />
                    ) : null}
                    <form onSubmit={this.handleSubmit} className="input-field">
                    <button type="button" className="toggle-emoji" onClick={this.toggleEmojiPicker}>
                        <Smile />
                    </button>
                    <input className="message-input" type="text" placeholder="Type your message and hit ENTER to send..." onChange={this.handleChange} value={this.state.message}/>
                    {/* <input className="message-submit" type="submit" value="send" /> */}
                    </form>
                </>
            )
        }
    }
    export default Input;