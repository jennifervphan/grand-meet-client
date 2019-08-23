import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class EachPostCard extends Component {
    render() {
            const {posts}= this.props;
            let eachPost= posts.map((post,index)=>{
                if(post.short){
                    return(
                        <div className="eachPost"  key={index}>
                            <div className="titleDiv">
                                <div className="sharePic" style={{backgroundImage: `url(${post.author.profilePicUrl})`, marginRight:"10px"}}></div>
                                <h4 className="postTitle">{post.title}</h4>
                            </div>
                            <p style={{marginTop:"10px"}}>{post.short[0]} {post.short[1]}</p>
                            <div className="footerDiv">
                                <p><i class="far fa-clock"></i> {post.niceTime}</p>
                                <Link to={{
                                pathname:`/share/thoughtsCorner/allThoughts/${post._id}`
                                }}>Read more</Link>
                            </div>
                            
                        </div>
                    )
                } else{
                    return(
                        <div className="eachPost" key={index}>
                            <div className="titleDiv">
                                <div className="sharePic" style={{backgroundImage: `url(${post.author.profilePicUrl})`, marginRight:"10px"}}></div>
                                <h4 className="postTitle">{post.title}</h4>
                            </div>
                            <p style={{marginTop:"10px"}}>{post.text[0]} ...</p>
                            <div className="footerDiv">
                                <p><i class="far fa-clock"></i> {post.niceTime}</p>
                                <Link to={{
                                pathname:`/share/thoughtsCorner/allThoughts/${post._id}`
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
    }
}
