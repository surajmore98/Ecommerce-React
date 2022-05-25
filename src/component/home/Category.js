import {Link} from 'react-router-dom';

function Category({category}) {
    const {img, name} = category;
    return(
        <div className="product-category-item">
            <Link className="border-charcoal-black" to={`/products?brand=${name.toLowerCase()}`}>
                <img src={img} alt={name} className="image" width="200" height="175"/>
            </Link>
        </div>
    )
}

export default Category;