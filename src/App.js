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
import NotFound from "./component/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={<Home/>}
        /> 
        <Route 
          path="/products" 
          element={<ProductList/>} 
        /> 
        <Route 
          path="/products/:type"
          element={<ProductList/>} 
        />
        <Route 
          path="/mock" 
          element={<Mock/>} 
        /> 
        <Route 
          path="/login" 
          element={<Login/>} 
        />
        <Route 
          path="/register" 
          element={<Register/>} 
        />
        <Route 
          path="/logout"
          element={<Logout/>}
         />
        <Route 
          path="/wishlist"
          element={<WishList/>}
        /> 
        <Route
          path="/cart"
          element = {<Cart/>} 
        />
        <Route 
          path="*" 
          element = {<NotFound/>}
        />
      </Routes>
    </div>
  );
}

export default App;
