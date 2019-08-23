import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import axios from 'axios';
import MainLayout from '../components/layout/MainLayout';
import {Link} from 'react-router-dom';
import './Nearby.css';

class Nearby extends Component {
    _isMounted = false

    constructor(props){
        super(props);
        this.state={
            users:[],
            sortedUsers:[]
        }
        this.calculateDistance=this.calculateDistance.bind(this);
    }

    calculateDistance (lat1, lon1, lat2, lon2){
        lat1 =  Math.PI * lat1/180
        lat2 = Math.PI * lat2/180
        lon1 = Math.PI * lon1/180
        lon2 = Math.PI * lon2/180
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.floor(Math.sqrt(x * x + y * y) * R);
        return d;
      }

    componentDidMount() {
        // this._isMounted = true;
        axios.get(`${process.env.REACT_APP_API}/nearby`, {withCredentials:true})
        .then(responseFromApi => {
            // if (this._isMounted) {
                let users= this.calculateUserDist(responseFromApi.data);
                localStorage.setItem('nearbyUsers', JSON.stringify(users));
                setTimeout(()=>{
                     this.setState({sortedUsers:users});
                }, 500)
        // }
    })
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }

      calculateUserDist= (users)=> {
        let userLong= this.props.userInSession.longitude;
        let userLat= this.props.userInSession.latitude;
        for (var i = 0; i < users.length; i++) {
            let otherLong=users[i].longitude;
            let otherLat= users[i].latitude;
            users[i]["distance"] = this.calculateDistance(userLat,userLong,otherLat,otherLong);}
        users.sort(function(a, b) { 
            return a.distance - b.distance;
        });
        return users
    } 

    render() {
        if(this.state.sortedUsers.length>0){        
        const users = this.state.sortedUsers;
        let eachUser=users.map(user=>{
            return(
                    <Link style={{textDecoration:"none"}} to={{ pathname: `/nearby/${user._id}`}}>

                        <div className="avaPic eachUser" style={{backgroundImage:`url(${user.profilePicUrl})` }}>
                        <div className="nameDist">
                            <h3 style={{margin:"0",color:"black"}}>{user.username}</h3>
                            <p style={{fontSize:"20px", margin:"0"}}><i className="fas fa-map-marker-alt"></i> {user.distance}km</p>
                        </div>
                        </div>
                    </Link>
            )
        })
        return (
            <MainLayout {...this.props}>
            <div className="NearbyPage">
              {eachUser}  
            </div>
            </MainLayout>
        )}
        return(
            <MainLayout {...this.props}>
                <h1>Loading...</h1>
            </MainLayout>
        )
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Nearby);