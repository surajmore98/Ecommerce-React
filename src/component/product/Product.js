import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useProduct } from "../../provider/ProductProvider";
import {addItemToWishlist, removeItemFromWishlist} from '../api/WishListManager';
import {addItemToCart, removeItemFromCart, updateCartItem} from '../api/CartManager';
import { useEffect, useState } from "react";
import NoItems from "../NoItems";
import Navbar from "../Navbar";
import "../../style/Product.css";

function Product() {
    const { id } = useParams();
    const { setCart, setWishList, cart, wishList, products, getproductsData } = useProduct();
    const navigate  = useNavigate();
    const { isAuth, token } = useAuth();
    const product = products.find(x => x._id === id);
    const [currentImage, setCurrentImage] = useState("");

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

    const updateCurrent = (value) => {
        setCurrentImage(value);
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
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function removeFromWishList() {
        try {
            if(checkAuth()) {
                const response = await removeItemFromWishlist(id, token);
                setWishList(response.data.wishlist);
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function removeFromCart() {
        try {
            if(checkAuth() && isPresentInCart()) {
                const response = await removeItemFromCart(id, token);
                setCart(response.data.cart);
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
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        (async() => {
            !products.length && await getproductsData();
        })();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="main-content">
                {
                    !product ? <NoItems/> :
                    <div className="product-container">
                        <div className="product-image">
                            <img src={currentImage ? currentImage : product.image} alt={currentImage ? currentImage : product.image} className="image" /> 
                        </div>
                        <div className="product-detail">
                            <div>
                                <div className="charcoal-black header m-sm">{product.title}</div>
                                <div className="m-md font-sm">
                                    <span>{product.brand}</span>
                                    <span className="error">{product.discount && `Discount: ${product.discount}`}</span>
                                </div>
                                <div className="charcoal-black sub-header">
                                    <span className="m-sm">&#x20B9;{product.discountedPrice}</span>
                                    <span className="m-sm alternate charcoal-gray">&#x20B9;{product.price}</span>
                                </div>
                            </div>
                            <div>
                                {
                                    isPresentInCart() ? 
                                    <button className="btn bg-info product-btn font-bold white"
                                        onClick={removeFromCart}>Remove From Cart</button>
                                    :<button className="btn bg-info product-btn font-bold white"
                                        onClick={addToCart}>Add to Cart</button>
                                }
                                {
                                    isPresentInWishlist() ? 
                                    <button className="btn bg-charcoal-gray product-btn font-bold white"
                                        onClick={removeFromWishList}>Remove From WishList</button>
                                    :<button className="btn bg-charcoal-gray product-btn font-bold white"
                                        onClick={addToWishList}>Save to WishList</button>
                                }
                            </div>
                            <div className="product-detail-image">
                                <div onClick={() => updateCurrent(product.image)} className={product.image === currentImage ? "product-image-active" : ""}>
                                    <img src={product.image} className="image" />
                                </div>
                                {
                                    (product.images && product.images.length > 0) && product.images.map((item, index)=> {
                                        return (
                                        <div key={index}
                                            className={currentImage === item ? "product-image-active" : ""}
                                            onClick={() => updateCurrent(item)}>
                                            <img src={item} className="image" />
                                        </div>);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Product;