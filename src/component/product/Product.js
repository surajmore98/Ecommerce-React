function Product({product}) {
    const {_id:id, title, price, discountedPrice, discount, image, brand} = product;
    
    async function addToCart() {
        // will be added in cart-managment functionality
    }

    async function addToWishList() {
        // will be added in wishlist-managment functionality
    }

    return (
        <div className="product-grid-item bg-white  m-sm">
            <div className="product-grid-item-media">
                <img src={image} alt={title} className="image" />
            </div>
            <div className="product-grid-item-content">
                <div>
                    <div className="charcoal-black header m-sm">{title}</div>
                    <div className="m-md font-sm">
                        <span>{brand}</span>
                        <span className="error">Discount: {discount}</span>
                    </div>
                    <div className="charcoal-black sub-header">
                        <span className="m-sm">&#x20B9;{discountedPrice}</span>
                        <span className="m-sm alternate charcoal-gray">&#x20B9;{price}</span>
                    </div>
                </div>
                <div>
                    <button className="btn bg-info white product-btn" onClick={addToCart}>Add to Cart</button>
                    <button className="btn bg-charcoal-gray white product-btn" onClick={addToWishList}>Save to WishList</button>
                </div>
            </div>
        </div>
    );
};

export default Product;