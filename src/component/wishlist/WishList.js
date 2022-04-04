import WishListItem from "./WishListItem";
import { useProduct } from "../../provider/ProductProvider";
import Navbar from "../Navbar";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NoItems from "../NoItems";

function WishList() {
    const { wishList } = useProduct();
    const { isAuth, localStorageToken } = useAuth();
    const navigate = useNavigate();

    const IsWishListEmpty = wishList.length ? false : true;

    //check authorization on route-navigation
    useEffect(() => {
        (!isAuth && !localStorageToken) && navigate("/login");
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
                {
                    IsWishListEmpty && <NoItems/>
                }
            </div>
        </div>
    );
}

export default WishList;