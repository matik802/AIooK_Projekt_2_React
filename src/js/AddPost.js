import React, {useEffect, useState} from 'react';
import API from "./API";
import { useNavigate } from 'react-router-dom';

function AddPost() {
    const navigate = useNavigate();
    const [showPostForm, setShowPostForm] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);
    const [rawTags, setRawTags] = useState([]);
    const [fileName, setFileName] = useState("");
    const [postValidationMsg, setPostValidationMsg] = useState('');
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
        hashtagsId: '',
        hashtagsName: '',
    });

    let tags = rawTags.map((tag) => ({
        id: tag.id,
        name: tag.name,
    }));

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const fetchData = async () => {

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

        if (!/^[A-Z].*$/.test(post.title)) {
            setPostValidationMsg("Post title should start with capital letter");
            return;
        }

        if (!/^[A-Z].*$/.test(post.content)) {
            setPostValidationMsg("Post content should start with capital letter");
            return;
        }

        if (fileName.length === 0) {
            setFileName("");
        }

        try {
            const response = await API.post("/posts", {
                title: post.title,
                body: post.content,
                dateCreated: new Date(),
                id_user: sessionStorage.getItem('userId'),
                postComments: '',
                postLikeReactions: 0,
                postDislikeReactions: 0,
                postPictures: fileName,
                tags: currentTags,

            });
        } catch (error) {
            console.error('Error while creating a new post', error);
        }
        navigate("/")
    };

    const handleImageUpload = (e) => {
        setFileName(e.target.value);
    };

    return (
        <div className="add-post-container">
                <div>
                    <h3>Add Post</h3>
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
                            placeholder="Copy & paste image link here"
                            value={fileName}
                            onChange={(e) => handleImageUpload(e)}
                        />
                        {fileName && <img src={fileName} alt="My post image"/>}
                        <span style={{color: 'red'}}>{postValidationMsg}</span>
                        <button type="submit"> Add Post</button>
                    </form>
                </div>
        </div>
    );
}

export default AddPost;
