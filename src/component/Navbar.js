import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import '../style/Navbar.css';

function Navbar() {
    const navigate  = useNavigate();
    const {isAuth} = useAuth();

    const cartProductCount = 0;
    const wishListProductCount = 0;
    const authButtonText = !isAuth ? "Login" : "Logout";

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
                <Link className="logo" to="/">
                    <img src="/resource/icon.jpg" className="image" alt="CHARCOAL-E"/>
                </Link>
                <div className="nav-action">
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
                    <button className="btn btn-round bg-white badge-wrapper" id="menu-btn">
                        <i className="material-icons">
                            menu
                        </i>
                    </button>
                </div>
            </nav>
            <ul className="nav-menu">
                <li onClick={() => clickHandler("login")}><a className="nav-menu-link bg-white charcoal-black">{authButtonText}</a></li>
                <li onClick={() => clickHandler("cart")}><a className="nav-menu-link bg-white charcoal-black">Cart</a></li>
                <li onClick={() => clickHandler("wishlist")}><a className="nav-menu-link bg-white charcoal-black">Wishlist</a></li>
            </ul>
        </div>
    );
}

export default Navbar;