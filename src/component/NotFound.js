import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function NotFound() {
    return (
        <div>
            <Navbar/>
            <div className="main-content not-found-container">
                <div className="not-found-wrapper">
                    <h1>404 - Not Found!</h1>
                    <Link to="/" className="btn bg-info white">Go Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;