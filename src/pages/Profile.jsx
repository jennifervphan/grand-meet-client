import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthService from '../components/auth/auth-service';
import './Profile.css';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { loggedInUser: null };
        this.service = new AuthService();
      }
    
      componentDidMount() {
        debugger
        let user= this.props.getUser(); 
        this.setState({loggedInUser:user})
        debugger
      }
      
      // getTheUser= () => {
      //   return JSON.parse(localStorage.getItem('user'));
      // }

      logoutUser = () =>{
        this.service.logout()
        .then(() => {
          this.setState({ loggedInUser: null });
          this.props.history.push('/');
          // this.props.getUser();  
        })
      }

    render() {
          if(this.state.loggedInUser){
            return (
              <MainLayout {...this.props}>
                <div className="ProfilePage">
                    <div className="profilePic" style={{  backgroundImage: `url(${this.state.loggedInUser.profilePicUrl})`}}></div>
                    <Link style={{ textDecoration:"none" }} to="/editProfile"><div className="editIcon"></div></Link>
                    <h3>{this.state.loggedInUser.username}</h3>
                    <hr style={{width: "100%"}}/>
                    <p className="aboutSect">About: {this.state.loggedInUser.about} </p>
                    <Link to='/'>
                    <button style={{margin: "20px 0"}} className="registerBtn" onClick={() => this.logoutUser()}>Logout</button>
                    </Link>
                </div>
              </MainLayout>
            )
          } else
          {
            return(
              <MainLayout {...this.props}>
                Loading...
              </MainLayout>
            )
          }         
    }
}
