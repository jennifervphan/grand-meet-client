import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

export default class NearbyUser extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API}/nearby/${params.id}`, {withCredentials:true})
        .then( response =>{
          const user = response.data;
          this.setState(user);
        //   this.props.history.push(`/nearby/${this.state._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render() {
        return (
            <div className="NearbyUser">
                <MainLayout {...this.props}>
                <div className="avaPic" style={{backgroundImage:`url(${this.state.profilePicUrl})` }}>
                </div>
                <h3>{this.state.username}</h3>
                <p><i className="fas fa-map-marker-alt"></i> {this.props.location.nearbyUserProps.user.distance}km</p>
                <hr/>
                <p>{this.state.about}</p>
                <Link to={{ pathname: `/chat/${this.state._id}`,
                            chatPartner: {user: this.props.location.nearbyUserProps.user}}}>
                    <button style={{margin: "20px 0"}} className="" type="submit">Message</button>
                </Link>
                </MainLayout>
            </div>
        )
    }
}
