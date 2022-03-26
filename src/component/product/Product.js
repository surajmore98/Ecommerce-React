import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useProduct } from "../../provider/ProductProvider";
import {addItemToWishlist} from '../api/WishListManager';
import {addItemToCart, updateCartItem} from '../api/CartManager';

function Product({product}) {
    const {_id:id, title, price, discountedPrice, discount, image, brand} = product;
    const { setCart, setWishList, cart} = useProduct();
    const navigate  = useNavigate();
    const { isAuth, token } = useAuth();
    
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
                if(cart && cart.length) {
                    const item = cart.find(c => c._id === id);
                    if(item) {
                        const req = { "id": id, "action" : "increment"};
                        const response = await updateCartItem(req, token);
                        if(response.status === 200) {
                            console.log(response.data.cart);
                            setCart(response.data.cart);
                            return;
                        }
                    }
                }
    
                const response = await addItemToCart(product, token);
                if(response.status === 201) {
                    console.log(response.data.cart);
                    setCart(response.data.cart);
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function addToWishList() {
        try {
            if(checkAuth()) {
                const response = await addItemToWishlist(product, token);
                if(response.status === 201) {
                    setWishList(response.data.wishlist);
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