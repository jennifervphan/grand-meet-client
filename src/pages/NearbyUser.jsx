import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import EachPostCard from '../components/share/EachPostCard';
import {formatWrittenAt} from '../method';

export default class NearbyUser extends Component {
    constructor(props){
        super(props);
        this.state={
            nearbyUsers:JSON.parse(localStorage.getItem('nearbyUsers')),
        }
        this.formatWrittenAt= formatWrittenAt.bind(this);
    }

    componentDidMount(){
        const { params } = this.props.match;
        let userId=params.id;
        let users=this.state.nearbyUsers;
        let nearbyUser = users.filter( function(user) {
            return user._id===userId
          })
        let nearby= nearbyUser[0]
        axios.get(`${process.env.REACT_APP_API}/postsBy/${nearby._id}`, {withCredentials:true})
        .then( response =>{
          const posts = response.data;
          let usersPosts = posts.filter(function(post) {
            return post.author._id === nearby._id;
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
    
          this.setState({posts:eachchangePost, user:nearby});
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render() {
        if(this.state.user){
                return (
                    <div className="NearbyUser">
                        <MainLayout {...this.props}>
                        <div className="avaPic" style={{backgroundImage:`url(${this.state.user.profilePicUrl})` }}>
                        </div>
                        <h3>{this.state.user.username}</h3>
                        <p><i className="fas fa-map-marker-alt"></i> {this.state.user.distance}km</p>
                        <hr/>
                        <p>{this.state.user.about}</p>
                        <Link to={{ pathname: `/chat/${this.state.user._id}`,
                                    chatPartner: {user: this.state.user}}}>
                            <button style={{margin: "20px 0"}} className="" type="submit">Message</button>
                        </Link>

                        {this.state.posts? <EachPostCard posts={this.state.posts}/> : <></>}

                        </MainLayout>
                    </div>
        )
            
        } else {
            return(
                <>
            </>
            )
            
        }

        
        
    }
}
