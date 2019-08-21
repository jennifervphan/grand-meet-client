import React, { Component } from 'react'
import AllPosts from './AllPosts';
import {Route,Link} from 'react-router-dom';
import EachPost from './EachPost';

export default class ShareCorner extends Component {
    render() {
        return (
            <div className="allPosts">
                <Link to="/share/shareYourThoughts"><button> Share your thougths</button></Link>
                <AllPosts {...this.props}/>

            </div>
        )
    }
}
