import './NewArticle.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function NewArticle() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(token);
    }, []);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        mediaType: "",
        tags: "",
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        setStatus(""); // Reset status
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('tags', formData.tags);
        data.append('thumbnailURL', formData.file);
        data.append("mediaType", formData.mediaType);
        data.append('mediaURL', file);
        data.append("leadStory", 0);

        try {
            const response = await axios.post("http://localhost:8000/api/article", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Article created successfully !");
            navigate("/article")
        } catch (error) {
            alert("An error occurred while creating the article");
        }
    }

    return (
        <>
            {IsLoggedIn ? (
                <div className="article-container">
                    <h1>Article Creation</h1>

                    <form className="article-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title :</label>
                            <input type="text" placeholder="Article title" name="title" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label for="file">Add a media</label>
                            <input id="file" type="file" placeholder="Url / file / etc..." name="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>

                        <div className="form-group">
                            <label>Media Type</label>
                            <select name="mediaType" onChange={handleChange}>
                                <option value="">Select a type</option>
                                <option value="image">Image</option>
                                <option value="sound">Sound</option>
                                <option value="video">Video</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Article text :</label>
                            <textarea placeholder="Content of the article" name="content" onChange={handleChange}></textarea>
                        </div>

                        <div className="form-group">
                            <label>Balise :</label>
                            <input type="text" placeholder="example #Friends , #MMI ..." name="tags" onChange={handleChange} />
                        </div>

                        <button type="submit" className="submit-button">Create Article</button>
                    </form>
                </div>
            ) : (
                <div className="article-container">
                    <p>You must be logged in to create an article.</p>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </>
    )
}

export default NewArticle;
