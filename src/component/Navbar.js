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
    const { setCart, setWishList, cart, wishList } = useProduct();
    const { isAuth, token, user } = useAuth();
    const [isMenu, setMenu] = useState(false);
    
    const cartProductCount = cart ? cart.length : 0;
    const wishListProductCount = wishList ? wishList.length : 0;
    
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
                    {
                        !isAuth ? 
                            <button className="btn white bg-charcoal-gray" onClick={() =>clickHandler("login")}>Login</button>
                        : 
                            <button className="btn btn-round bg-white badge-wrapper" id="menu-btn" onClick={menuClickHandler}>
                                <i className="material-icons">
                                    account_circle
                                </i>
                            </button>
                    }
                </div>
            </nav>
            <ul className={ isMenu ? 'nav-menu nav-menu-show bg-white' : 'nav-menu bg-white' }>
                <li>
                    <span className="nav-menu-link bg-white charcoal-black">
                        <div className="item p-md" >
                            <i className="material-icons">
                                person
                            </i>
                            <span>{`${user?.firstName} ${user?.lastName}`}</span>
                        </div>
                    </span>
                </li>
                <li onClick={() => clickHandler("cart")}>
                    <a className="nav-menu-link bg-white charcoal-black">
                        <div className="item">
                            <div className="badge-wrapper">
                                <i className="material-icons p-md">
                                    shopping_cart
                                </i>
                               {cartProductCount > 0 && <span className="badge badge-round badge-md top left bg-error white">{cartProductCount}</span> }
                            </div>
                            <span>Cart</span>
                        </div>
                    </a>
                </li>
                <li onClick={() => clickHandler("wishlist")}>
                    <a className="nav-menu-link bg-white charcoal-black">
                        <div className="item">
                            <div className="badge-wrapper p-md">
                                <i className="material-icons">
                                    favorite
                                </i>
                                { wishListProductCount > 0 && <span className="badge badge-round badge-md top left bg-error white">{wishListProductCount}</span>}
                            </div>
                            <span>Wishlist</span>
                        </div>
                    </a>
                </li>
                <li onClick={() => clickHandler("login")}>
                    <a className="nav-menu-link bg-white charcoal-black">
                        <div className="item">
                            <div className="badge-wrapper p-md">
                                <i className="material-icons">
                                    logout
                                </i>
                            </div>
                            <span>Logout</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;