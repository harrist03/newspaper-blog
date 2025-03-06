import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

function Search({ onSearch }) {
    const [tags, setTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/tag")  
            .then((response) => setTags(response.data))
            .catch((error) => console.error("Erreur de chargement des tags:", error));
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);  
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Rechercher un article par tag"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={handleSearch}>Rechercher</button>
            <button onClick={() => onSearch("")}>Réinitialiser</button>

            <div className="tags-list">
                {tags.map((tag) => (
                    <span
                        key={tag.id}  
                        className="tag"
                        onClick={() => onSearch(tag.name)}  
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Search;
