import {Link} from "react-router-dom";

export default function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to="/">HOME</Link>
            </div>
            <div className="navbar-right">
                <Link to="/login">Log In</Link>
                <Link to="/friends">Friends</Link>
                <Link to="/editProfile">Edit profile</Link>
                <Link to="/addPost">Add post</Link>
            </div>
        </div>
    );
}