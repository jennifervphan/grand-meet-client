import React, { Component } from 'react';
import axios from 'axios';

export default class PostInput extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            text:'',
            user: JSON.parse(localStorage.getItem('user'))
        }
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API}`,
            withCredentials: true
          });
        this.service=service;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const text = this.state.text;
        const title = this.state.title;
        this.service.post('/post', {text, title})
        .then(response=>{
            this.props.history.push('/share/thoughtsCorner/allThoughts')
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
                <input name="title" placeholder="title" value={this.state.title} onChange={this.handleChange} type="text"/>
                <textarea className="form-control" name="text" cols="40" rows="5" placeholder="Share your thought..." value={this.state.text} onChange={this.handleChange}></textarea>
                <button style={{marginTop:"10px"}} type="submit">Share</button>
            </form>
            </div>
        )
    }
}
