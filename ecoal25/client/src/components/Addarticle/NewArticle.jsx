import './NewArticle.css';
import {useState} from "react";
import axios from "axios";

function NewArticle() {
    const [formData, setFormData] = useState({
        title: "",
        file: null,
        content : "",
        tags: "",
        })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('tags', formData.tags);
        data.append('thumbnailURL', formData.file);
        data.append("mediaType", "image");
        data.append('mediaURL', formData.file);
        data.append("leadStory", 0)

        try {
            const response = await axios.post("http://localhost:8000/api/article", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Article created successfully !");
        } catch (error) {
            alert("An error occurred while creating the article");
        }
    }

    return (
        <>
            <div className="article-container">
                <h1>Article Creation</h1>

                <form className="article-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title :</label>
                        <input type="text" placeholder="Article title" name="title" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Photo / video / sound :</label>
                        <input type="file" placeholder="Url / file / etc..." name="file" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Article text :</label>
                        <textarea placeholder="Content of the article" name="content" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Balise :</label>
                        <input type="text" placeholder="example #Friends , #MMI ..." name="tags" onChange={handleChange}/>
                    </div>

                    <button type="submit" className="submit-button">Create Article</button>
                </form>
            </div>

        </>
    )
}

export default NewArticle;
