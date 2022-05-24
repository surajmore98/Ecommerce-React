import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useProduct } from "../../provider/ProductProvider";
import {addItemToWishlist} from '../api/WishListManager';
import {addItemToCart, updateCartItem} from '../api/CartManager';

function Product({product}) {
    const {_id:id, title, price, discountedPrice, discount, image, brand} = product;
    const { setCart, setWishList, cart, wishList } = useProduct();
    const navigate  = useNavigate();
    const { isAuth, token } = useAuth();

    const isPresentInCart = () => {
        return cart && cart.length > 0 ? cart.some(x => x._id === id) : false;
    }
    
    const isPresentInWishlist = () => {
        return wishList && wishList.length > 0 ? wishList.some(x => x._id === id) : false;
    }
    
    function checkAuth() {
        if(!isAuth) {
            navigate("/login");
            return false;
        }
        return true;
    }
    
    async function addToCart() {
        try {
            if(checkAuth()) {
                if(isPresentInCart()) {
                    return;
                }
    
                const response = await addItemToCart(product, token);
                if(response.status === 201) {
                    setCart(response.data.cart);
                    navigate("/cart");
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function addToWishList() {
        try {
            if(checkAuth()) {
                if(isPresentInWishlist()) {
                    return;
                }

                const response = await addItemToWishlist(product, token);
                if(response.status === 201) {
                    setWishList(response.data.wishlist);
                    navigate("/wishlist");
                }
            }
        } catch(e) {
            console.error(e);
        }
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
                        <span className="error">{discount && `Discount: ${discount}`}</span>
                    </div>
                    <div className="charcoal-black sub-header">
                        <span className="m-sm">&#x20B9;{discountedPrice}</span>
                        <span className="m-sm alternate charcoal-gray">&#x20B9;{price}</span>
                    </div>
                </div>
                <div>
                    <button className={`btn bg-info product-btn ${isPresentInCart() ? 'product-btn-disabled charcoal-black' : 'white'}`} onClick={addToCart}>Add to Cart</button>
                    <button className={`btn bg-charcoal-gray product-btn ${isPresentInWishlist() ? 'product-btn-disabled charcoal-black' : 'white'}`} onClick={addToWishList}>Save to WishList</button>
                </div>
            </div>
        </div>
    );
};

export default Product;