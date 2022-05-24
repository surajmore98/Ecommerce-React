import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/AuthManager';
import { useAuth } from '../../provider/AuthProvider';
import Navbar from '../Navbar';
import { useEffect } from 'react';
import { guestCredentials } from '../../constant';

function Login() {
    const { credential, setCredential, error, setError, setAuth, setToken } = useAuth();
    const { email, password } = credential;
    const [isRemeberMe, setRemeberMe] = useState();
    const navigate = useNavigate();

    //to reset error value for new login.
    useEffect(() => {
        setError(false);
    }, [credential])

    function inputChangeHandler(e, type) {
        const value  = e.target.value;
        if(value) {
            setCredential({...credential, [type]: value});
        }
    }

    function checkboxChangedHandler() {
        setRemeberMe((value) => !value);
    }

    async function guestLogin(e) {
        setCredential(guestCredentials);
        try {
            const response = await login({email: guestCredentials.email, password: guestCredentials.password});
            if(response.status === 200) {
                setToken(response.data.encodedToken);
                setAuth(true);
                navigate("/");
            }
        } catch(e) {
            console.error(e);
            setError(true);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if(credential) {
            try {
                const response = await login(credential);
                if(response.status === 200) {
                    setToken(response.data.encodedToken);
                    if(isRemeberMe) {
                        localStorage.setItem("token", response.data.encodedToken);
                    }
                    setAuth(true);
                    navigate("/");
                }
            } catch(e) {
                console.error(e);
                setError(true);
            }
        }
    }

    function navigateToRegister() {
        return navigate("/register");
    }

    return (
        <div>
            <Navbar/>
            <div className="main-content register-container">
                <div className="register">
                    <div className="header">
                        Login
                    </div>
                    <form className="register-content" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="input-label">Email address</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="example@example.com" value={email} onChange={(e) => inputChangeHandler(e, "email")} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Password</label>
                            <div className="form-control">
                                <input type="password" className="input" placeholder="******" value={password} onChange={(e) => inputChangeHandler(e, "password")} required/>
                            </div>
                        </div>
                        <div className="form-field-section">
                            <div className="form-field form-field-horizontal font-md">
                                <label className="form-control-horizontal">
                                    <input type="checkbox" value={isRemeberMe} onClick={checkboxChangedHandler}/>
                                    <span className="input-label">Remember me</span>
                                </label>
                                <a className="link info p-sm">Forgot your Password?</a>
                            </div>
                        </div>
                        <button className="btn product-btn bg-info white p-md" type="submit">Login</button> 
                        <button className="btn product-btn bg-info white p-md" onClick={guestLogin}>Guest Login</button> 
                        <button onClick={navigateToRegister} className="btn product-btn bg-charcoal-white charcoal-black p-md">Create New Account</button> 
                    </form>
                    <div className='error'>
                        {error && "The credentials you entered are invalid!!"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;