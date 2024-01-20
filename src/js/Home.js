// Home.jsx

import React, { useEffect, useState } from 'react';
import API from "./API";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await API.get("/posts");
            setPosts(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }

        try {
            const response = await API.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const findUserName = (userId) => {
        const user = users.find((user) => user.id == userId);
        return user ? user.name + " " + user.surname : 'Unknown User';
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPosts = posts.filter(post => {
        const lowerSearch = search.toLowerCase();
        return (
            post.title.toLowerCase().includes(lowerSearch) ||
            post.body.toLowerCase().includes(lowerSearch) ||
            findUserName(post.id_user).toLowerCase().includes(lowerSearch)
        );
    });

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
                        <div>
                            <p className="home-post-title">{post.title}</p>
                            <p>{findUserName(post.id_user)}</p>
                            <button>jakies przejscie do innego użytkownika</button>
                        </div>
                        <div className="home-post-body">
                            <p>{post.body}</p>
                            <ul className="home-post-tags">
                                {post.tags?.map((tag, index) => (
                                    <li key={index}> #{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="home-post-buttons">
                            <div>
                                <button type="button" className="home-like-button">
                                    Like/Dislike
                                </button>
                                <button type="button" className="home-comment-button">
                                    Comment
                                </button>
                                <button type="button" className="home-save-button">
                                    Save? Maybe
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
