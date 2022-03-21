import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

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