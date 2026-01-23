import { Link } from "react-router-dom";
import "../styles/NoteFound.css";

export default function NotFound(){
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <h2 className="notfound-subtitle">Page Not Found</h2>
            
            <p className="notfound-text">
                Sorry, the page you’re looking for doesn’t exist or is still under development.
            </p>

            <Link to="/" className="notfound-button">
            Go Back Home.
            </Link>
        </div>
    );
}