import React, {useEffect, useState} from 'react';
import API from "./API";
import {Link, useNavigate} from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        let userId = sessionStorage.getItem('userId');
        if (userId === " " || userId == null) {
            navigate("/login");
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await API.get("/posts");
            setPosts(response.data);
        } catch (error) {
            console.error('Error while fetching posts data', error);
        }

        try {
            const response = await API.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error('Error while fetching users data', error);
        }
    }

    const findUserName = (userId) => {
        let user = users.find((user) => parseInt(user.id, 16) === parseInt(userId));
        return user ? user.name + " " + user.surname : 'Unknown User';
    };

    // const findUserImage = (userId) => {
    //     let user = users.find((user) => parseInt(user.id, 16) === parseInt(userId));
    //     return user.picture !=="" ? user.picture : null;
    // }

    const handleReaction = async (postId, type) => {
        try {
            // Pobierz aktualny stan posta
            const response = await API.get(`/posts/${postId}`);
            const currentPost = response.data;

            if (type == "like") {
                currentPost.postLikeReactions++;
            } else {
                currentPost.postDislikeReactions++;
            }

            // Wyślij zaktualizowany stan z powrotem do serwera
            const updateResponse = await API.put(`/posts/${postId}`, currentPost);
            const r = await API.get("/posts");
            setPosts(r.data);

            // Przetwarzaj odpowiedź, aktualizuj stany lub inaczej obsługuj dane z serwera
            console.log('Reaction response:', updateResponse.data);
        } catch (error) {
            console.error('Error while reacting to post', error);
        }
    };

    const filteredPosts = posts.filter(post => {
        const lowerSearch = search.toLowerCase();
        return (
            post.title.toLowerCase().includes(lowerSearch) ||
            post.body.toLowerCase().includes(lowerSearch) ||
            findUserName(post.id_user).toLowerCase().includes(lowerSearch)
        );
    });

    const handleEdit = async (e, postId) => {
        navigate("/editpost/"+postId);
    };

    const handleDelete = async (e, postId) => { 
        try {
            // Pobierz aktualny stan posta
            const response = await API.delete(`/posts/${postId}`);
            // Wyślij zaktualizowany stan z powrotem do serwera

            // Przetwarzaj odpowiedź, aktualizuj stany lub inaczej obsługuj dane z serwera
            console.log('Reaction response:', response.data);
        } catch (error) {
            console.error('Error while deleting post', error);
        }
    };

    return (
        <div className="home-container">
            <div className="home-search-container">
                <form>
                    <input
                        type="text"
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="home-search-input"
                    />
                </form>
            </div>
            <h2>Popular posts:</h2>
            <div>

                {filteredPosts.map((post, index) => (
                    <div key={post.id} className="home-post">
                        <h2 className="home-post-title">{post.title}</h2>
                        {/* {findUserImage(post.id_user) !== null ? <img src={findUserImage(post.id_user)} height={100}/> : null} */}
                        <Link className="home-post-author" to={"/profile/"+post.id_user}> <p>{findUserName(post.id_user)}</p></Link>
                        {post.postPictures !== "" ? <img src={post.postPictures} alt = {"Image for the post " + post.title} height={400}/> : null}
                        <div>
                            <p className="home-post-body">{post.body}</p>
                        </div>
                        <div className="home-post-buttons">
                            <div>
                                <button onClick={() => handleReaction(post.id, "like")} className="home-like-button">
                                    Like ({post.postLikeReactions})
                                </button>
                                <button onClick={() => handleReaction(post.id, "dislike")}
                                        className="home-dislike-button">
                                    Dislike ({post.postDislikeReactions})
                                </button>
                                <div className="home-comment">
                                </div>
                                <br></br>
                                {parseInt(post.id_user) === parseInt(sessionStorage.getItem("userId")) ? 
                                    <>
                                    <button onClick={(e) => handleEdit(e, post.id)} className="home-edit-button">
                                        Edit post
                                    </button>
                                    <button onClick={(e) => handleDelete(e, post.id)} className="home-delete-button">
                                        Delete post
                                    </button>
                                    </>:
                                    null
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;