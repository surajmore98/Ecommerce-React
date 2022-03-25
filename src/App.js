import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import Mock from "./component/Mock";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Logout from "./component/auth/Logout";
import Home from "./component/home/Home";
import ProductList from "./component/product/ProductList";
import WishList from "./component/wishlist/WishList";
import Cart from "./component/cart/Cart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/products" element={<ProductList/>} /> 
        <Route path="/products/:type" element={<ProductList/>} />
        <Route path="/mock" element={<Mock/>} /> 
        { !isAuth && <Route path="/login" element={<Login/>} /> }
        { !isAuth && <Route path="/register" element={<Register/>} /> }
        { isAuth && <Route path="/logout" element={<Logout/>} /> }
        { isAuth &&<Route path="/wishlist" element={<WishList/>} />  }
        { isAuth &&<Route path="/cart" element={<Cart/>} /> }
      </Routes>
    </div>
  );
}

export default App;
