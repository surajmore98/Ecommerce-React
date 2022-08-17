import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useProduct } from "../../provider/ProductProvider";
import {addItemToWishlist, removeItemFromWishlist} from '../api/WishListManager';

function ProductListItem({product}) {
    const {_id:id, title, price, discountedPrice, discount, image, brand} = product;
    const { setWishList, wishList } = useProduct();
    const navigate = useNavigate();
    const { isAuth, token } = useAuth();
    
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

    async function addToWishList() {
        try {
            if(checkAuth()) {
                if(isPresentInWishlist()) {
                    const response = await removeItemFromWishlist(id, token);
                    setWishList(response.data.wishlist);
                } 
                else {
                    const response = await addItemToWishlist(product, token);
                    if(response.status === 201) {
                        setWishList(response.data.wishlist);
                    }
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    const productClickHandler = () => navigate(`/product/${id}`);

    return (
        <div className="product-grid-item bg-white m-sm">
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
                <button className='btn bg-info product-btn white font-bold' onClick={productClickHandler}>View Details</button> 
            </div>
            <button className="wishlist" onClick={addToWishList}>
                { isPresentInWishlist() ? 
                    <i className="material-icons info">
                        favorite
                    </i>
                    :
                    <i className="material-icons info">
                        favorite_border
                    </i>
                }
            </button>
        </div>
    );
};

export default ProductListItem;