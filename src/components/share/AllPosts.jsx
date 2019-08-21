import React, { Component } from 'react';
import axios from 'axios';
import './AllPosts.css';
export default class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state= {};
    }

    componentDidMount(){
        axios({
            method: "GET",
            baseURL:`${process.env.REACT_APP_API}/post`,
            withCredentials: true
        })
        .then(response=>{
            console.log(response.data)
            this.setState({
                posts: response.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render() {
        if(this.state.posts){
            const {posts}= this.state;
        let eachPost= posts.map((post,index)=>{
            return(
                <div className="eachPost" key={index}>
                    <p>{post.text}</p>
                </div>
            )
        })
        return (
            <div  className="posts">
                {eachPost}
            </div>
        )
        } else {
            return(
                <>
                Loading...
                </>
            )
        }
        
    }
}
