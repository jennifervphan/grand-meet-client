import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import CommonRoom from '../../pages/CommonRoom';

export default class CommonRoomIntro extends Component {
    render() {
        return (
            <div className="commonRoomIntro">
                <h3>Welcome to the Common Room</h3>
                <p>You can talk with other online users 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam vitae fringilla purus. Aenean commodo facilisis elit, ac pulvinar neque malesuada sed. 
                </p>
                <p>Play some chess 
                    Mauris vestibulum metus id est maximus dignissim. 
                    Nunc id libero et enim fermentum semper. Nulla porta tristique lorem, et fermentum ex ornare sed. 
                    Aenean quis cursus erat, ut consequat quam. Praesent id velit metus. Aenean ut dui eget massa euismod tristique.
                </p>
                <Link style={{textDecoration:"none", color: "white"}} to="/share/commonRoom">
                    <button>Enter</button> 
                </Link>
            </div>
        )
    }
}
