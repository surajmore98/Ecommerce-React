import { Link } from 'react-router-dom';
function Banner() {
    const bannerImage = "/resource/banner.jpg";
    return (
        <div className="banner">
            <img src={bannerImage} alt="view more" className="image" />
            <div className="banner-content">
                <h1 className="banner-content-header white">Explore The World With Better Moves!</h1>
                <Link to="/products" className="btn btn-lg banner-content-action">View More</Link>
            </div>
        </div>
    );
};

export default Banner;