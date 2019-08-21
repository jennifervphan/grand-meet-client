// import Chatkit from '@pusher/chatkit-client';
// import axios from 'axios';

    function toggleEmojiPicker() {
      this.setState({
        showEmojiPicker: !this.state.showEmojiPicker,
      });
    }

    function addEmoji(emoji) {
      const { message } = this.state;
      const text = `${message}${emoji.native}`;

      this.setState({
        message: text,
        showEmojiPicker: false,
      });
    }

export {toggleEmojiPicker, addEmoji };