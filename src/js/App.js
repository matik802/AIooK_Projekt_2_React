import Login from "./Login";
import Home from "./Home";
import EditProfile from "./EditProfile";
import Friends from "./Friends";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import EditPost from "./EditPost"

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/profile/:userId" element={<UserProfile />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/addPost" element={<AddPost />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/editpost/:postId" element={<EditPost />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
