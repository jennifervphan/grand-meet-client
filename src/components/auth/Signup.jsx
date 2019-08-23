import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import {geolocated} from 'react-geolocated';
// import MainLayout from '../layout/MainLayout';

class Signup extends Component {
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = { username: '', password: '', file: null };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(this.formRef.current)
    form.append("longitude",this.props.coords.longitude)
    form.append("latitude",this.props.coords.latitude)

    this.service.signup(form)
    .then(response => {
      console.log(response)
        this.setState({
            username: "", 
            password: "",
            file: null,
            // message:response.data.message

        });
        this.props.history.push('/profile')
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  uploadPic=(event)=>{
    this.setState({
      file: (event.target.files[0])})
  }

  render(){
    return(
      <div className="loginPage">
         <nav className="Navbar">
            <Link to="/" style={{textDecoration:"none", color: "white"}}><h3>grandMeet</h3></Link>
            <Link to='/login' style={{ textDecoration: 'none', color:"white"}}><h3>Login</h3></Link>
        </nav>
      <Link to="/" style={{ textDecoration: 'none', color:"white" }}><i className="fas fa-times-circle fa-2x"></i></Link>
        <div className="signupForm">
        <h3>Register</h3>
        {/* {this.state.message?
        (<p>{this.state.message}</p>)
        :
        (null)} */}
        <form className="loginInput" ref={this.formRef} onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <label>Profile Picture:</label>
          <input type="file" name="picture" onChange={this.uploadPic}/>

          <button className="submitBtn" type="submit">Register</button>
        </form>
  
        <p>Already have account? 
            <Link to={"/login"} style={{ color: 'rgb(5, 5, 5)', textDecoration:"underline" }}> Login</Link>
        </p>
        </div>
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Signup);
