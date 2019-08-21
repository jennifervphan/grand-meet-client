import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import AuthService from '../auth/auth-service';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    // this.service = new AuthService();
  }

  componentDidMount() {
    debugger
    let user= this.props.getUser(); 
    this.setState({loggedInUser:user})
  }

  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="Navbar" style={{backgroundColor:"#334455", opacity:"0.7"}}>
          {/* <Link to="/" style={{textDecoration:"none", color: "white"}}><h3>grandMeet</h3></Link> */}
          {/* <div className="navItems"> */}
          <Link to="/profile" style={{ textDecoration: 'none', color: "white"}}><h4 className="navItem">Profile</h4></Link>
          <Link to="/nearby" style={{ textDecoration: 'none', color: "white"}}><h4 className="navItem">Nearby</h4></Link>
          <Link to="/share" style={{ textDecoration: 'none', color: "white"}} ><h4 className="navItem">Share</h4></Link>
          <Link to="/inbox" style={{ textDecoration: 'none', color: "white"}}><i className="navItem fas fa-comments fa-2x"></i></Link>
          {/* </div> */}
        </nav>
      )
    } else {
      return ( 
        <nav className="Navbar">
            <Link to="/" style={{textDecoration:"none", color: "white"}}><h3>grandMeet</h3></Link>
            <Link to='/login' style={{ textDecoration: 'none', color:"white"}}>Login</Link>
        </nav>
      )
    }
  }
}

export default Navbar;