import React, { Component } from 'react';
import axios from 'axios';
import './AllPosts.css';
import {Link} from 'react-router-dom';

export default class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state= {};
        this.formatWrittenAt=this.formatWrittenAt.bind(this);
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
            debugger
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

    formatWrittenAt (writtenAt, now) {
        if (writtenAt.getDate() === now.getDate() &&
            writtenAt.getMonth() === now.getMonth() &&
            writtenAt.getFullYear() === now.getFullYear()) {
            return "today " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
                (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString()) + ":" +
                (writtenAt.getSeconds() < 10 ? "0" + writtenAt.getSeconds().toString() : writtenAt.getSeconds().toString());
        } else if (writtenAt.getMonth() === now.getMonth() &&
            writtenAt.getFullYear() === now.getFullYear() &&
            writtenAt.getDate() === now.getDate() - 1) {
            return "yesterday " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
                (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString()) + ":" +
                (writtenAt.getSeconds() < 10 ? "0" + writtenAt.getSeconds().toString() : writtenAt.getSeconds().toString());
        } else if (writtenAt.getFullYear() === now.getFullYear()) {
            return (writtenAt.getDate() < 10 ? "0" + writtenAt.getDate().toString() : writtenAt.getDate().toString()) + "." +
                (writtenAt.getMonth() < 10 ? "0" + writtenAt.getMonth().toString() : writtenAt.getMonth().toString()) +
                ". " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
                (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes().toString()) + ":" +
                (writtenAt.getSeconds() < 10 ? "0" + writtenAt.getSeconds().toString() : writtenAt.getSeconds().toString());
        } else {
            return (writtenAt.getDate() < 10 ? "0" + writtenAt.getDate().toString() : writtenAt.getDate()) + "." +
                (writtenAt.getMonth() < 10 ? "0" + writtenAt.getMonth().toString() : writtenAt.getMonth()) + "." +
                writtenAt.getFullYear().toString() +
                " " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours()) + ":" +
                (writtenAt.getMinutes() < 10 ? "0" + writtenAt.getMinutes().toString() : writtenAt.getMinutes()) + ":" +
                (writtenAt.getSeconds() < 10 ? "0" + writtenAt.getSeconds().toString() : writtenAt.getSeconds());
        }
    }

    render() {
        if(this.state.posts){
            const {posts}= this.state;
        let eachPost= posts.map((post,index)=>{
            if(post.short){
                debugger
                // let eachShort= post.short.map(short=>{
                //     return(
                //         <p style={{margin:"0"}}>{short}</p>
                //     )
                // })
                return(
                    <div className="eachPost"  key={index}>
                        <div className="rowFlex" style={{marginBottom:"15px", alignItems:"center"}}>
                            <div className="sharePic" style={{backgroundImage: `url(${post.author.profilePicUrl})`, marginRight:"10px"}}></div>
                            <h4>{post.title}</h4>
                        </div>
                        {/* {eachShort} */}
                        <p style={{margin:"0"}}>{post.short[0]}</p>
                        <p>{post.short[1]}</p>
                        <div className="rowFlex" style={{justifyContent:"space-between", alignItems:"end"}}>
                            <p><i class="far fa-clock"></i> {post.niceTime}</p>
                            <Link to={{
                            pathname:`/share/thoughtsCorner/${post._id}`
                            }}>Read more
                            </Link>
                        </div>
                        
                    </div>
                    
                    
                )
            } else{
                return(
                    <div className="eachPost" key={index}>
                        <div className="rowFlex" style={{marginBottom:"15px"}}>
                            <div className="sharePic" style={{backgroundImage: `url(${post.author.profilePicUrl})`, marginRight:"10px"}}></div>
                            <h4>{post.title}</h4>
                        </div>
                        <p style={{margin:"0"}}>{post.text[0]}</p>
                        <p>...</p>
                        <div className="rowFlex" style={{justifyContent:"space-between", alignItems:"end"}}>
                            <p><i class="far fa-clock"></i> {post.niceTime}</p>
                            <Link to={{
                            pathname:`/share/thoughtsCorner/${post._id}`
                            }}>Read more</Link>
                        </div>
                    </div>
            )
            }
            
        })
        return (
            <div  className="posts">
                {eachPost}
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
