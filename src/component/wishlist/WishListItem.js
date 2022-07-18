import { useProduct } from "../../provider/ProductProvider";
import { removeItemFromWishlist } from "../api/WishListManager";
import { addItemToCart } from "../api/CartManager";
import { useAuth } from "../../provider/AuthProvider";

function WishListItem({product}) {
    const {title, discountedPrice, image, _id:id} = product;
    const {wishList, setCart, setWishList} = useProduct();
    const { token } = useAuth();

    async function moveToCart() {
        const currentProduct = wishList.find(x => x._id === id);
        if(currentProduct) {
            try {
                const response = await removeItemFromWishlist(id,token);
                if(response.status === 200) {
                    setWishList(response.data.wishlist);
                    const addToCartResponse = await addItemToCart(currentProduct, token);
                    if(addToCartResponse.status === 201) {
                        setCart(addToCartResponse.data.cart);
                    }
                }                    
            } catch(e) {
                console.error(e);
            }
        }
    }

    async function removeFromWishList() {
        const currentProduct = wishList.find(x => x._id === id);
        if(currentProduct) {
            try {
                const response = await removeItemFromWishlist(id, token);
                setWishList(response.data.wishlist);
            } catch(e) {
                console.error(e);
            }
        }
    }

    return (
        <div className="wishlist-card bg-white  m-lg p-md">   
            <div className="wishlist-card-media">
                <img src={image} alt={title} className="image" />
            </div>
            <div className="wishlist-card-content">
                <div className="charcoal-black wishlist-card-content m-lg">{title}</div>
                <div className="charcoal-black wishlist-card-content-bold m-lg">
                    &#x20B9;{discountedPrice}
                </div>
            </div>
            <div>
                <button className="btn product-btn bg-info white" onClick={moveToCart}>Move to Cart</button>
                {/* <button className="btn product-btn bg-charcoal-gray white" onClick={removeFromWishList}>Remove From WishList</button> */}
            </div>
            <button className="wishlist" onClick={removeFromWishList}>
                <i className="material-icons info">
                    favorite
                </i>
            </button>
        </div>
    )
}

export default WishListItem;