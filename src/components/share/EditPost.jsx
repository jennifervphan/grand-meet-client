import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            text:""
        }
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API}`,
            withCredentials: true
          });
        this.service=service;
    }

    componentDidMount(){
        const { params } = this.props.match;
        axios({
            method:"GET",
            baseURL:`${process.env.REACT_APP_API}/post/${params.id}`,
            withCredentials:true
        })    
        .then(response=>{
            let post=response.data.post;
            this.setState({
                title:post.title,
                text:post.text,
                post:post
            })
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const text = this.state.text;
        const title = this.state.title;
        this.service.post(`/editPost/${this.state.post._id}`, {text, title})
        .then(response=>{
            let updatedPost=response.data
            this.props.history.push(`/share/thoughtsCorner/allThoughts/${updatedPost._id}`)
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
        return (
            <div className="postInput">
            <form onSubmit={this.handleFormSubmit}>
                <label style={{marginRight:"20px"}}>Title</label>
                <input name="title" placeholder="title" value={this.state.title} onChange={this.handleChange} type="text"/>
                <textarea className="form-control" name="text" cols="40" rows="5" placeholder="Share your thought..." value={this.state.text} onChange={this.handleChange}></textarea>
                <button style={{marginTop:"10px"}} type="submit">Edit</button>
            </form>
            </div>
        )
    }
}
