import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './destroy.css';

function Destroy() {
    const navigate = useNavigate();
    const { id } = useParams();  

    const handleDelete = () => {
        axios
            .delete(`http://127.0.0.1:8000/api/article/${id}`)  
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'article:", error);
            });
    };

    return (
        <div className="destroy-container">
            <box-icon 
                name="x" 
                onClick={handleDelete} 
                size="lg" 
                className="delete-icon"
            ></box-icon>
        </div>
    );
}

export default Destroy;
