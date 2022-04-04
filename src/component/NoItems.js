import { Link } from "react-router-dom";

function NoItems() {
    return (
    <div className="main-content not-found-container">
        <div className="not-found-wrapper">
            <h1>No Items To Show!</h1>
            <Link to="/" className="btn bg-info white">Go Home</Link>
        </div>
    </div>
    );
}

export default NoItems;