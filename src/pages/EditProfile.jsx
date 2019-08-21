import React, { Component } from 'react';
import MainLayout from '../components/layout/MainLayout';
import axios from 'axios';
import '../components/auth/Login.css'

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = {about: '', file: null };
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(this.formRef.current);
        form.append('user',this.props.userInSession._id)
        axios({
            method:"POST",
            baseURL: `${process.env.REACT_APP_API}/edit`,
            withCredentials: true,
            data:form
          })
        .then(response => {
            this.setState({
                about: "",
                file: null
    
            });
            localStorage.setItem('user', JSON.stringify(response.data));
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

    render() {
        return (
            <MainLayout {...this.props}>
                <form className="editPage signupForm" ref={this.formRef} onSubmit={this.handleFormSubmit}>
                    <label>About </label>
                    <input style={{height:'100px', width:'300px'}} type="text" name="about" value={this.state.about} onChange={ e => this.handleChange(e)}/>

                    <label>Profile Picture </label>
                    <input style={{border:"solid 1px grey", width:"300px"}} type="file" name="picture" onChange={this.uploadPic}/>

                    <button className="submitBtn">Save</button>
                </form>
            </MainLayout>
        )
    }
}
