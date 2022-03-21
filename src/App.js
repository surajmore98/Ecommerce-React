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
      {/* <ScriptTag type="text/javascript" 
      src="http://127.0.0.1:5500/src/js/index.js" /> */}
    </div>
  );
}

export default App;
