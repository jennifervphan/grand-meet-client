import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Login from '../components/commonRoom/Login';
import Games from '../components/commonRoom/Games';
import "../components/commonRoom/GameBoard.css";

class CommonRoom extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        user: JSON.parse(localStorage.getItem('user'))
      };
  }

  //  enterGame(username) {
  //   this.setState({
  //   });
  // }

  render() {
    let contents;
    // if (this.state.username) {
      contents = <Games username={this.state.user.username} />
    // } else {
    //   contents = <Login login={this.enterGame.bind(this)} />
    // }
    return (
      <>
        { contents }
      </>
    );
  }
}

export default CommonRoom;