import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import CommonRoom from "./CommonRoom";
import MainLayout from '../components/layout/MainLayout';
import ShareCorner from '../components/share/ShareCorner';
import "./SharePage.css"
import PostInput from '../components/share/PostInput';
import EachPost from '../components/share/EachPost';

export default class SharePage extends Component {
    render() {
        return (
            <MainLayout {...this.props}>
                <div className="columnFlex" style={{width:"100%", height: "88vh", justifyContent:"space-between"}}>
                <div className="sharingTab">
                <Link style={{textDecoration:"none", color: "black"}} to="/share/commonRoom">
                    <h4>Common Room</h4>
                    {/* <p>Sed eleifend id ipsum a aliquam. Donec ultrices sollicitudin ullamcorper. 
                        Donec porta est in nibh elementum congue. 
                        Pellentesque tellus sapien, pharetra ut arcu a, consequat tincidunt leo. 
                        Integer diam metus, ultricies quis est at, eleifend cursus magna. 
                        Nam quis scelerisque eros. Duis a lectus vitae risus efficitur lacinia et a tortor. 
                        Etiam mollis dui lacus, eget tincidunt ligula condimentum vitae. Aliquam eu tellus tellus.</p> */}
                </Link>

                <Link style={{textDecoration:"none", color: "black"}} to="/share/thoughtsCorner">
                    <h4>Sharing Corner</h4>
                    {/* <p>Sed eleifend id ipsum a aliquam. Donec ultrices sollicitudin ullamcorper. 
                        Donec porta est in nibh elementum congue. 
                        Pellentesque tellus sapien, pharetra ut arcu a, consequat tincidunt leo. 
                        Integer diam metus, ultricies quis est at, eleifend cursus magna. 
                        Nam quis scelerisque eros. Duis a lectus vitae risus efficitur lacinia et a tortor. 
                        Etiam mollis dui lacus, eget tincidunt ligula condimentum vitae. Aliquam eu tellus tellus.</p> */}
                </Link>
                </div>
                
                <Route path='/share/commonRoom' render = {(routeProps) => <CommonRoom {...routeProps}/>} />
                <Route path='/share/shareYourThoughts' render = { (routeProps) => <PostInput {...routeProps}/>}/>
                <Route exact path="/share/thoughtsCorner" render = { (routeProps) => <ShareCorner {...routeProps} />}/>
                <Route path="/share/thoughtsCorner/:id" render = { (routeProps) => <EachPost {...routeProps}/>}/>

                </div>
            </MainLayout>
        )
    }
}
