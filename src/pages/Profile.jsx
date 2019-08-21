import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthService from '../components/auth/auth-service';
import EachPostCard from '../components/share/EachPostCard';
import './Profile.css';
import axios from 'axios';
import { formatWrittenAt } from "../method";

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { 
          user: JSON.parse(localStorage.getItem('user'))
        };
        this.service = new AuthService();
        this.formatWrittenAt=formatWrittenAt.bind(this)
      }
    
      componentDidMount() {
        let user= this.state.user; 
        axios.get(`${process.env.REACT_APP_API}/postsBy/${user._id}`, {withCredentials:true})
        .then( response =>{
          const posts = response.data;
          let usersPosts = posts.filter(function(post) {
            return post.author._id === user._id;
        });

        let now = new Date();

        let eachchangePost= usersPosts.map(post=>{
            if (post.text[0].length > 100) {
            post.short = []
            post.short[0] = post.text[0].substring(0, 100) + "..."
        }else if (post.text.length > 1) {
            post.short = []
            post.short[0] = post.text[0]
            post.short[1] = "..."
            }
            post.niceTime = this.formatWrittenAt(new Date(post.writtenAt), now);
            return post
        })
          this.setState({posts:eachchangePost});
        })
        .catch((err)=>{
            console.log(err)
        })
        // this.setState({loggedInUser:user})
      }

      logoutUser = () =>{
        this.service.logout()
        .then(() => {
          this.setState({ user: null });
          this.props.history.push('/');
        })
      }

    render() {
          if(this.state.user){
            return (
              <MainLayout {...this.props}>
                <div className="ProfilePage">
                    <div className="profilePic" style={{  backgroundImage: `url(${this.state.user.profilePicUrl})`}}></div>
                    <Link style={{ textDecoration:"none" }} to="/editProfile"><div className="editIcon"><i class="fas fa-pen fa-2x"></i></div></Link>
                    <h3>{this.state.user.username}</h3>
                    <hr style={{width: "100%"}}/>
                    <p className="aboutSect">About: {this.state.user.about} </p>
                    <Link to='/'>
                    <button style={{margin: "20px 0"}} onClick={() => this.logoutUser()}>Logout</button>
                    </Link>
                </div>
                {this.state.posts? <EachPostCard posts={this.state.posts}/> : <></>}
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
