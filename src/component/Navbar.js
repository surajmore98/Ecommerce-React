import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import '../style/Navbar.css';
import { useProduct } from '../provider/ProductProvider';
import { getCartItems } from './api/CartManager';
import { getWishlistItems } from './api/WishListManager';
import { useEffect, useState } from 'react';
import logo  from '../icon.jpg';

function Navbar() {
    const navigate  = useNavigate();
    const { wishList, cart, setCart, setWishList } = useProduct();
    const { isAuth, token } = useAuth();
    const [isMenu, setMenu] = useState(false);

    const cartProductCount = cart ? cart.length : 0;
    const wishListProductCount = wishList ? wishList.length : 0;
    const authButtonText = !isAuth ? "Login" : "Logout";

    // load cart data on authentication
    useEffect(() => {
        isAuth && (async () => {
          const response = await getCartItems(token);
          setCart(response.data.cart);
        })(); 
      }, [isAuth]);
  
    // load wishlist data on authentication
    useEffect(() => {
        isAuth && (async () => {
            const response = await getWishlistItems(token);
            setWishList(response.data.wishlist);
        })(); 
    }, [isAuth]);

    function menuClickHandler() {
        setMenu((value) => !value);
    }


    function clickHandler(type) {
        if(type) {
            switch (type) {
                case "login":
                    navigate(isAuth ? "/logout" : "/login");
                    break;
                case "cart":
                    navigate(isAuth ? "/cart" : "/login");
                    break;
                case "wishlist":
                    navigate(isAuth ? "/wishlist" : "/login");
                    break;
                default:
                    navigate("/home");
                    break;
            }
        }
    }

    return(
        <div>
            <nav className="nav-bar bg-white">
                <Link className="logo" to="/" id="menu">
                    <img src={logo} className="image" alt="CHARCOAL-E"/>
                </Link>
                <div className="nav-action ml-auto">
                    <button className="btn white bg-charcoal-gray" onClick={() =>clickHandler("login")}>{authButtonText}</button>
                    <button className="btn btn-round bg-white badge-wrapper" onClick={() => clickHandler("wishlist")}>
                        <i className="material-icons">
                            favorite_border
                        </i>
                        <div className="badge badge-round badge-md top right bg-error white">{wishListProductCount}</div>
                    </button>
                    <button className="btn btn-round bg-white badge-wrapper" onClick={() => clickHandler("cart")}>
                        <i className="material-icons">
                            shopping_cart
                        </i>
                        <div className="badge badge-round badge-md top right bg-error white">{cartProductCount}</div>
                    </button>
                </div>
                <div className="nav-action">
                    <button className="btn btn-round bg-white badge-wrapper" id="menu-btn" onClick={menuClickHandler}>
                        <i className="material-icons">
                            menu
                        </i>
                    </button>
                </div>
            </nav>
            <ul className={ isMenu ? 'nav-menu nav-menu-show bg-white' :'nav-menu bg-white' }>
                <li onClick={() => clickHandler("login")}><a className="nav-menu-link bg-white charcoal-black">{authButtonText}</a></li>
                <li onClick={() => clickHandler("cart")}><a className="nav-menu-link bg-white charcoal-black">Cart</a></li>
                <li onClick={() => clickHandler("wishlist")}><a className="nav-menu-link bg-white charcoal-black">Wishlist</a></li>
            </ul>
        </div>
    );
}

export default Navbar;