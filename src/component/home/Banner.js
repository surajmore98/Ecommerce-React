import { Link } from 'react-router-dom';
function Banner() {
    const bannerImage = "/resource/banner.jpg";
    return (
        <div className="p-xl banner">
            <img src={bannerImage} alt="view more" className="image" />
            <Link to="/products" className="btn btn-lg product-category-title">View More</Link>
        </div>
    );
};

export default Banner;