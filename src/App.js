import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import Mock from "./component/Mock";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Logout from "./component/auth/Logout";
import Home from "./component/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/mock" element={<Mock/>} /> 
      </Routes>
    </div>
  );
}

export default App;
