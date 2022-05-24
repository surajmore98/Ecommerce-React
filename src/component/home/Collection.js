import { Link } from 'react-router-dom';

function Collection({item, action}) {
    const {img, type, detail, value} = item;
    return (
        <Link className="product-category charcoal-gray" to={`products?gender=${value.toLocaleLowerCase()}`}>
            <img src={img} alt={type} className="image" />
            <div className="category-section">
                <div className="charcoal-black category-section-title">{type}</div>
                <p className="charcoal-black category-section-detail">{detail}</p>
            </div>
        </Link>
    );
};

export default Collection;