import Login from "./Login";
import Home from "./Home";
import MyProfile from "./EditProfile";
import Friends from "./Friends";
import AddPost from "./AddPost";
import EditProfile from "./EditProfile";
import Navbar from  "./Navbar"
import {Route, Routes} from "react-router-dom";

function App() {

  return (
      <>
          <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/editProgile" element={<EditProfile />}/>
                    <Route path="/addPost" element={<AddPost />}/>
                    <Route path="/friends" element={<Friends />}/>
                    <Route path="/editProfile" element={<EditProfile />}/>
                    <Route path="/addPost" element={<AddPost />}/>
                </Routes>
            </div>
      </>
);
}

export default App;
