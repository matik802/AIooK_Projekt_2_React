import React, {useEffect, useState} from 'react';
import axios from "axios";

const Friends = () => {
    const [filter, setFilter] = useState('');
    const [count, setCount] = useState(0);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState('');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleAcceptFriend = async (friendId) => {
    };

    const handleRemoveFriend = async (friendId) => {
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("api/users/friends");
            setFriends(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }

        try {
            const response = await axios.get("api/users/getRequests");
            setRequests(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    };

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
            <p>Ja bym tu zrobiła widok zaproszenia i znajomi napewno</p>
            <p>i npw jakis ładny sposob jeszcze wszystkich użytkowników  wrzucic których możemy dodać do znajomych</p>
            <p>może 3 przewijane sekcje czy cos</p>
            <div>
                <h2>Requests:</h2>
                {Array.isArray(requests) && requests.length > 0 ? (
                    <ul>
                        {requests.map(request => (
                            <li key={request.id}>
                                {`${request.name} ${request.surename}`}
                                <button
                                    type="button"
                                    variant="info"
                                    onClick={() => handleAcceptFriend(request.id)}>
                                    Accept
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No invites</p>
                )}
            </div>
            <div>
                <h2>Friends List:</h2>
                {Array.isArray(friends) && friends.length > 0 ? (
                    <ul>
                        {friends.map(friend => (
                            <li key={friend.id}>
                                {`${friend.name} ${friend.surename}`}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFriend(friend.id)}>Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No friends</p>
                )}
            </div>
        </div>
    );
};

export default Friends;