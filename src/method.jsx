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

function formatWrittenAt(writtenAt, now) {
  if (writtenAt.getDate() === now.getDate() &&
      writtenAt.getMonth() === now.getMonth() &&
      writtenAt.getFullYear() === now.getFullYear()) {
      return "today at " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
          (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString());
  } else if (writtenAt.getMonth() === now.getMonth() &&
      writtenAt.getFullYear() === now.getFullYear() &&
      writtenAt.getDate() === now.getDate() - 1) {
      return "yesterday at " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
          (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString());
  } else if (writtenAt.getFullYear() === now.getFullYear()) {
      return " on " +(writtenAt.getDate() < 10 ? "0" + writtenAt.getDate().toString() : writtenAt.getDate().toString()) + "." +
          (writtenAt.getMonth() < 10 ? "0" + writtenAt.getMonth().toString() : writtenAt.getMonth().toString()) +"."+
          writtenAt.getFullYear().toString() +
          " at " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
          (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString());
  } else {
      return " on " +(writtenAt.getDate() < 10 ? "0" + writtenAt.getDate().toString() : writtenAt.getDate()) + "." +
          (writtenAt.getMonth() < 10 ? "0" + writtenAt.getMonth().toString() : writtenAt.getMonth()) + "." +
          writtenAt.getFullYear().toString() +
          " at " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours()) + ":" +
          (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes());
  }
}

export {toggleEmojiPicker, addEmoji, formatWrittenAt };