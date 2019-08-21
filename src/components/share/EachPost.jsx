import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    formatWrittenAt
  } from '../../method'; 

export default class EachPost extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.formatWrittenAt= formatWrittenAt.bind(this)
    }

    componentDidMount(){
        const { params } = this.props.match;
        debugger
        axios({
            method:"GET",
            baseURL:`${process.env.REACT_APP_API}/post/${params.id}`,
            withCredentials:true
        })
        .then(response=>{
            let now = new Date();
            let post = response.data;
                post.niceTime = this.formatWrittenAt(new Date(post.writtenAt), now);
            this.setState({post:post})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        if(this.state.post){
            let eachLine= this.state.post.text.map(text=>{
                return(
                    <p className="eachLine">{text}</p>
                )
            })
            return (
            <div className="postDetails">
                <h3 className="eachLine">{this.state.post.title}</h3>
                <div className="rowFlex" style={{alignItems:"center"}}>
                    <div className="eachMesDiv" style={{backgroundImage: `url(${this.state.post.author.profilePicUrl})`, width:"40px", height:"40px"}}></div>
                    <p className="eachLine">Posted by <Link to={{ pathname: `/nearby/${this.state.post.author._id}`}}>{this.state.post.author.username}</Link>            
                    </p>
                </div>
                <p className="eachLine" style={{marginTop:"10px", color:"darkgrey !important"}}>{this.state.post.niceTime}</p>
                <hr/>
                {eachLine}
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
