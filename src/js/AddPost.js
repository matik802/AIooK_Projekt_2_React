import React, {useEffect, useState} from 'react';
import API from "./API";

function AddPost() {
    const [showPostForm, setShowPostForm] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);
    const [rawTags, setRawTags] = useState([]);
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

    const addTag = (e) => {
        e.preventDefault();
        let tag = {id: post.hashtagsId, name: post.hashtagsName};
        for (let i = 0; i < currentTags.length; i++) {
            if (currentTags[i].id === tag.id) return;
        }
        setCurrentTags(currentTags => [...currentTags, tag]);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        try {
            const response = await API.get("/tags");
            setRawTags(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data =
            {
                title: post.title,
                body: post.content,
                dateCreated: new Date(),
                tags: currentTags,
            }
    };

    const showPostFormHandler = () => {
        setShowPostForm(true);
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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataURL = reader.result;
                setPost((prevPost) => ({
                    ...prevPost,
                    image: imageDataURL,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1>Z tego to trzeba zrobić jakies okno które bedzie mozna otwierac na roznych widokach</h1>
            {!showPostForm ? (
                <div>
                    <button onClick={showPostFormHandler}>Add Post</button>
                </div>
            ) : (
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
                            type="file"
                            name="image"
                            id="imageUpload"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            style={{display: 'none'}}
                        />
                        <label htmlFor="imageUpload">
                            Add Picture
                        </label>
                        {post.image && <img src={post.image} alt="Profile Picture"/>}
                        <select
                            name="tag"
                            onChange={(e) => handleTagChange(e.target.value)}>
                            <option value="">
                                Choose
                            </option>
                            {tags?.map((tag, index) => (
                                <option key={index} value={JSON.stringify({id: tag.id, name: tag.name})}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <ul>
                            <label>Tags:</label>
                            {currentTags?.map((tag, index) => (
                                <li key={index}> #{tag.name}</li>
                            ))}
                        </ul>
                        <button type="submit"> Add Post</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddPost;