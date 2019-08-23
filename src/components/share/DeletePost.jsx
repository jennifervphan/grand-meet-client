import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class DeletePost extends Component {
    componentDidMount(){
        const {params} = this.props.match
        axios({
            method:"POST",
            baseURL:`${process.env.REACT_APP_API}/deletePost/${params.id}`,
            withCredentials:true
        })   
        .then(()=>{
            return <Redirect to="/share/thoughtsCorner/allThoughts"/>
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                Deleting...
            </div>
        )
    }
}
