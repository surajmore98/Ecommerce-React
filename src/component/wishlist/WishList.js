import WishListItem from "./WishListItem";
import { useProduct } from "../../provider/ProductProvider";
import Navbar from "../Navbar";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getWishlistItems } from "../api/WishListManager";
import { useEffect } from "react";

function WishList() {
    const { wishList, setWishList } = useProduct();
    const { isAuth, token } = useAuth();
    const navigate = useNavigate();

    //check authorization on route-navigation
    useEffect(() => {
        !isAuth && navigate("/login");
    },[]);

    return (
        <div>
            <Navbar/>
            <div className="main-content">
                <h1 className="wishlist-header">My WishList</h1>
                <div className="wishlist">
                    <div className="wishlist-content">
                        {
                            wishList && wishList.map((item, index) => {
                                return <WishListItem product={item} key={index}/>
                            })
                        }
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default WishList;