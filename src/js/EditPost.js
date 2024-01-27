import React, {useEffect, useState} from 'react';
import API from "./API";
import {useNavigate, useParams} from "react-router-dom";

function AddPost() {
    const navigate = useNavigate();
    const [showPostForm, setShowPostForm] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);
    const {postId} = useParams();
    const [rawTags, setRawTags] = useState([]);
    const [fileName, setFileName] = useState([])
    const [postValidationMsg, setPostValidationMsg] = useState('');
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
        hashtagsId: '',
        hashtagsName: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        try {
            const response = await API.get("/posts/" + postId);
            setPost((prevPost) => ({
                ...prevPost,
                title: response.data.title,
                content: response.data.body,
                image: response.data.postPictures,
            }));
        } catch (error) {
            console.error('Error while fetching data', error);
        }       
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!/(https?:\/\/.*\.(?:png|jpg))/i.test(fileName) && fileName.length > 0) { 
            setPostValidationMsg("Wrong image adress");
            return;
        }

        if (!/^[A-Z][A-Za-z0-9_-]*$/.test(post.title)) {
            setPostValidationMsg("Post title should start with capital letter");
            return;
        }

        if (!/^[A-Z][A-Za-z0-9_-]*$/.test(post.content)) {
            setPostValidationMsg("Post content should start with capital letter");
            return;
        }

        try {
            const response = await API.patch("/posts/" + postId, {
                title: post.title,
                body: post.content,
                dateCreated: new Date(),
                id_user: sessionStorage.getItem('userId'),
                postComments: '',
                postLikeReactions: 0,
                postDislikeReactions: 0,
                postPictures: post.image,
                tags: currentTags,

            });
        } catch (error) {
            console.error('Error while creating a new post', error);
        }
        navigate("/")
    };

    const handleTagChange = (tagPick) => {
        if (tagPick.length === 0) return;
        let tag = JSON.parse(tagPick);
        setPost((prevPost) => ({
            ...prevPost,
            hashtagsId: tag.id,
            hashtagsName: tag.name,
        }));
    };

    const handleImageUpload = (e) => {
        setPost((prevPost) => ({
            ...prevPost,
            image: e.target.value,
        }));
    };


    return (
        <div className="add-post-container">
                <div>
                    <h3>Edit Post</h3>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={post.title}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="textarea"
                            name="content"
                            placeholder="Content"
                            rows="4"
                            value={post.content}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="image"
                            id="imageUpload"
                            value={post.image}
                            placeholder="Copy & paste image link here"
                            onChange={(e) => handleImageUpload(e)}
                        />
                        {post.image && <img src={post.image} alt = "My post image"/>}
                        <span style={{color: 'red'}}>{postValidationMsg}</span>
                        <button type="submit"> Edit Post</button>
                    </form>
                </div>
        </div>
    );
}

export default AddPost;
