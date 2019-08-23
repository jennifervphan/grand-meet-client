import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {formatWrittenAt} from '../../method'; 

export default class EachPost extends Component {
    constructor(props){
        super(props);
        this.state={
            user:JSON.parse(localStorage.getItem('user')),
            comment:'',
            post:null
        };
        this.formatWrittenAt= formatWrittenAt.bind(this)
    }

    componentDidMount(){
        const { params } = this.props.match;
        axios({
            method:"GET",
            baseURL:`${process.env.REACT_APP_API}/post/${params.id}`,
            withCredentials:true
        })
        .then(response=>{
            console.log(response.data)
            let now = new Date();
            let post = response.data.post;
            let comments = response.data.comments;
            let eachComment= comments.map(comment=>{
                comment.niceTime= this.formatWrittenAt(new Date(post.writtenAt), now);
                return comment
            })
                post.niceTime = this.formatWrittenAt(new Date(post.writtenAt), now);
            this.setState({post:post, comments:eachComment})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    deletePost (postId){
        axios({
            method:"POST",
            baseURL:`${process.env.REACT_APP_API}/deletePost/${postId}`,
            withCredentials:true
        })   
        .then((response)=>{
            this.setState({post:response.data.post, comments:null})
            this.props.history.push('/share/thoughtsCorner/allThoughts');
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const comment = this.state.comment;
        const user=this.state.user;
        axios.post(`${process.env.REACT_APP_API}/post/${this.state.post._id}/comment`,{comment, user})
        .then(response=>{ 
            let now = new Date();
            let post=response.data.post;
            post.niceTime = this.formatWrittenAt(new Date(post.writtenAt), now);
            let comments = response.data.comments;
            let eachComment= comments.map(comment=>{
                comment.niceTime= this.formatWrittenAt(new Date(post.writtenAt), now);
                return comment
            })
            this.setState({comments:eachComment, post:post, comment:""})
            this.props.history.push(`/share/thoughtsCorner/allThoughts/${post._id}`)    
        })
        .catch(err =>{
            console.log(err)
        })
      }
      
    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    }

    render() {
        if(this.state.post){
            let eachLine= this.state.post.text.map(text=>{
                return(
                    <p className="eachLine">{text}</p>
                )
            })
            let eachComment;
            if(this.state.comments){
                eachComment= this.state.comments.map(comment=>{
                    return(
                        <div className="columnFlex" style={{width:"100vh"}}>
                            {comment.author._id === this.state.user._id?
                            (<>  
                                <div className="rowFlex" style={{marginBottom:"10px"}}> 
                                    <div className="eachMesDiv" style={{backgroundImage: `url(${comment.author.profilePicUrl})`, width:"50px", height:"50px"}}></div>
                                    <div className="columnDiv">
                                    <p className="commentLine">
                                    <Link to={{pathname: `/profile`}}>
                                    {comment.author.username} </Link> <span className="">{comment.text}</span></p>
                                    <p style={{textAlign:"left"}}>{comment.niceTime}</p>
                                    </div>
                                </div>
                            </>
                            ):
                            (<>
                                <div className="rowFlex" style={{marginBottom:"20px"}}> 
                                    <div className="eachMesDiv" style={{backgroundImage: `url(${comment.author.profilePicUrl})`, width:"50px", height:"50px"}}></div>
                                    <div className="columnDiv">
                                    <p className="commentLine">
                                    <Link to={{pathname: `/nearby/${comment.author._id}`}}>
                                    {comment.author.username} </Link> <span className="">{comment.text}</span></p>
                                    <p style={{textAlign:"left"}}>{comment.niceTime}</p>
                                    </div>
                                </div>
                            </>)
                            }
                        </div>
                    )
                })
            }
            return (
            <div className="postDetails">
                <h1 style={{textAlign:"left"}}>{this.state.post.title}</h1>
                    <div className="eachMesDiv" style={{backgroundImage: `url(${this.state.post.author.profilePicUrl})`, width:"50px", height:"50px"}}></div>
                    {this.state.post.author._id === this.state.user._id?
                        (<>
                            <p className="postedByLine">Posted by <Link to={{ pathname: `/profile`}}>{this.state.post.author.username}</Link>  </p>
                            <p style={{textAlign:"left"}}>{this.state.post.niceTime}</p>
                            <div className="rowFlex" style={{justifyContent:"flex-start"}}>
                                <Link style={{marginRight:"10px"}} to={{pathname: `/share/thoughtsCorner/allThoughts/editThought/${this.state.post._id}`}}>Edit</Link>
                                <Link   className="deleteBtn"
                                        onClick={()=>{this.deletePost(this.state.post._id)}} 
                                        exact to="#">Delete
                                </Link>
                            </div>
                        </>
                        ) 
                        :   
                        (<>
                            <p className="postedByLine">Posted by <Link to={{ pathname: `/nearby/${this.state.post.author._id}`}}>{this.state.post.author.username}</Link>            
                            </p>
                            <p style={{textAlign:"left"}}>{this.state.post.niceTime}</p>
                        </>
                        )
                    }
                <hr/>
                {eachLine}
                <hr/>
                <form onSubmit={this.handleFormSubmit}>
                    <textarea className="form-control" name="comment" cols="40" rows="5" placeholder="Comment..." value={this.state.comment} onChange={this.handleChange}></textarea>
                    <button className="commentBtn" type="submit">Comment</button>
                </form>
                <div className="columnFlex">
                {eachComment}
                </div>
                <hr/>
                
            </div>
        )
        }
        else{
            return(
                <>
                </>
            )
        }
        
    }
}
