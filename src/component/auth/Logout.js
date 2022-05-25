import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../provider/AuthProvider';

function Logout() {
    const { setAuth, setToken, isAuth } = useAuth();
    const navigate = useNavigate();

    //check authorization on route-navigation
    useEffect(() => {
        !isAuth && navigate("/login");
    },[]);
    
    useEffect(()=> {
        setAuth(false);
        setToken("");
        localStorage.removeItem("token");
    },[]);

    function clickHandler() {
        navigate("/login");
    }

    return (
        <div className="main-content register-container">
            <div className="register">
                <div className="header">
                    <p>You are Logged Out, Please Sign in Again.</p>
                </div>
                <button className="btn bg-info white p-sm" onClick={clickHandler}>Sign In</button> 
            </div>
        </div>

    );
}

export default Logout;