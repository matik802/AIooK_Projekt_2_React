import React, {useEffect, useState} from 'react';
import API from "./API";

const Home = () => {
    const [Posts, setPosts] = useState([]);
    const [User, setUser] = useState([]);
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
            setUser(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <form>
                <label>Search:</label>
                <input
                    type="text"
                    onChange={handleSearchChange}
                    placeholder="Search"
                />
            </form>
            <h2>Popular:</h2>
            <div>
                {Posts.map((post, index) => (
                    <div key={post.id}>
                        <div>
                            <p>{post.title}</p>
                            <p> User i jego imię maybe</p>
                            {/*<p>{post.user.name}</p>*/}
                            <button>jakies przejscie do innego użytkownika</button>
                        </div>
                        <div>
                            <p>{post.body}</p>
                            <p>Tutaj wlecą tagi trzeba ładnie je wyświetlić</p>
                            <ul>
                                {post.tags?.map((tag, index) => (
                                    <li key={index}> #{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div>
                                <button
                                    type="button">
                                    Like/Dislike
                                </button>
                                <button
                                    type="button">
                                    Comment
                                </button>
                                <button
                                    type="button"
                                >Save? Maybe
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