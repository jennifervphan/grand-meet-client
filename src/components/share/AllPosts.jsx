import React, { Component } from 'react';
import axios from 'axios';
import './AllPosts.css';
import {formatWrittenAt} from '../../method'; 
import EachPostCard from './EachPostCard';

export default class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state= {};
        this.formatWrittenAt=formatWrittenAt.bind(this);
    }

    componentDidMount(){
        axios({
            method: "GET",
            baseURL:`${process.env.REACT_APP_API}/post`,
            withCredentials: true
        })
        .then(response=>{
            let changePost = response.data;
            let now = new Date();
            let eachchangePost= changePost.map(post=>{
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
        
            this.setState({posts:eachchangePost})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render() {
        if(this.state.posts){
            return <EachPostCard posts={this.state.posts}/>
        } else {
            return(
                <>
                </>
            )
        }
        
    }
}
