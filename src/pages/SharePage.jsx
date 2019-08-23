import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import CommonRoomIntro from "../components/commonRoom/CommonRoomIntro";
import CommonRoom from './CommonRoom';
import MainLayout from '../components/layout/MainLayout';
import ShareCorner from '../components/share/ShareCorner';
import "./SharePage.css"
import PostInput from '../components/share/PostInput';
import EachPost from '../components/share/EachPost';
import EditPost from '../components/share/EditPost';
import DeletePost from '../components/share/DeletePost';

export default class SharePage extends Component {
    render() {
        return (
            <MainLayout {...this.props}>
                {/* <div className="columnFlex" style={{width:"100%", height: "88vh", justifyContent:"space-between"}}> */}
                    <div className="sharebackground">
                        <div className="sharingTab">
                            <Link style={{textDecoration:"none", color: "white"}} to="/share/commonRoomIntro">
                                <h3>Common Room</h3>
                            </Link>
                            <Link style={{textDecoration:"none", color: "white"}} to="/share/thoughtsCorner/allThoughts">
                                <h3>Thoughts Corner</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="otherComponents">
                    <Route path='/share/commonRoomIntro' render = {(routeProps) => <CommonRoomIntro {...routeProps}/>} />
                    <Route path='/share/commonRoom' render = {(routeProps) => <CommonRoom {...routeProps}/>} />
                    <Route path='/share/shareYourThoughts' render = { (routeProps) => <PostInput {...routeProps}/>}/>
                    <Route exact path="/share/thoughtsCorner/allThoughts" render = { (routeProps) => <ShareCorner {...routeProps} />}/>
                    <Route exact path="/share/thoughtsCorner/allThoughts/:id" render = { (routeProps) => <EachPost {...routeProps}/>}/>
                    <Route exact path="/share/thoughtsCorner/allThoughts/editThought/:id" render = { (routeProps) => <EditPost {...routeProps}/>}/>
                    {/* <Route exact path="/share/thoughtsCorner/allThoughts/delete/:id" render = {(routeProps)=> <DeletePost {...routeProps}/>}/> */}
                    </div>
                {/* </div> */}
            </MainLayout>
        )
    }
}
