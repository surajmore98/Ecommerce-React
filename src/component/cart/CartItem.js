import { useAuth } from "../../provider/AuthProvider";
import { useProduct } from "../../provider/ProductProvider";
import { removeItemFromCart, updateCartItem  } from "../api/CartManager";
import { addItemToWishlist } from "../api/WishListManager";

function CartItem({product}) {
    const { _id:id, title, price, discountedPrice, discount, image, qty } = product;
    const { setCart, setWishList, cart } = useProduct();
    const { token } = useAuth();

    async function moveToWishList() {
        const currentProduct = cart.find(x => x._id === id);
        if(currentProduct) {
            try {
                const response = await removeItemFromCart(id, token);
                if(response.status === 200) {
                    setCart(response.data.cart);
                    const addToWishResponse = await addItemToWishlist(currentProduct, token);
                    if(addToWishResponse.status === 201) {
                        setWishList(addToWishResponse.data.wishlist);
                    }
                }                    
            } catch(e) {
                console.error(e);
            }
        }
    }

    async function removeFromCart() {
        const currentProduct = cart.find(x => x._id === id);
        if(currentProduct) {
            try {
                if(currentProduct.qty <= 1) {
                    const response = await removeItemFromCart(id, token);
                    setCart(response.data.cart);
                } else {
                    const response = await updateCartItem({id: id, action: "decrease"}, token);
                    setCart(response.data.cart);
                }
            } catch(e) {
                console.error(e);
            }
        }
    }

    async function increaseQuantity() {
        const response = await updateCartItem({ "id" : id, "action": "increment" }, token);
        if(response) {
            setCart(response.data.cart);
        }
    }

    async function decreaseQuantity() {
        if(qty <= 1) {
            return;
        }

        const response = await updateCartItem({ "id" : id, "action": "decrement" }, token);
        if(response) {
            setCart(response.data.cart);
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
                    <div className="charcoal-black sub-header">
                        <span className="m-sm">&#x20B9;{discountedPrice}</span>
                        <span className="m-sm alternate charcoal-gray">&#x20B9;{price}</span>
                    </div>
                    <div className="charcoal-gray detail m-sm">{discount}</div>
                    <div className="charcoal-gray detail m-sm">
                        <div className="detail-text">Quantity: </div>
                        <div className="counter-input">
                            <button className="btn btn-round" onClick={decreaseQuantity} disabled={qty <= 1}>-</button>
                            <input type="number" value={qty} />
                            <button className="btn btn-round" onClick={increaseQuantity}>+</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn product-btn bg-info white" onClick={moveToWishList}>Move to WishList</button>
                    <button className="btn product-btn bg-charcoal-gray white" onClick={removeFromCart}>Remove From Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;