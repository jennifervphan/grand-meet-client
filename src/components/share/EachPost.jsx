import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class EachPost extends Component {
    constructor(props){
        super(props);
        this.state={};
        // this.formatWrittenAt= this.formatWrittenAt.bind(this)
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

    formatWrittenAt = (writtenAt, now)=> {
        if (writtenAt.getDate() === now.getDate() &&
            writtenAt.getMonth() === now.getMonth() &&
            writtenAt.getFullYear() === now.getFullYear()) {
            return "at " + (writtenAt.getHours() < 10 ? "0" + writtenAt.getHours().toString() : writtenAt.getHours().toString()) + ":" +
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
