import {Link, useNavigate} from 'react-router-dom';
import { register } from '../api/AuthManager';
import { useAuth } from '../../provider/AuthProvider';
import Navbar from '../Navbar';
import { useEffect } from 'react';

function Register() {
    const { credential, setCredential, error, setError, setAuth, setToken } = useAuth();
    const { email, password, firstName, lastName } = credential;
    const navigate = useNavigate();

    //to reset error value for new register.
    useEffect(() => {
        setError("");
    }, [credential])

    function inputChangeHandler(e, type) {
        const value  = e.target.value;
        if(value) {
            setCredential({...credential, [type]: value});
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(credential) {
            try {
                const response = await register(credential);
                if(response.status === 201) {
                    setToken(response.data.encodedToken);
                    setAuth(true);
                    navigate("/");
                }
            } catch(e) {
                console.error(e);
                setError(e.response.data.errors[0] ?? "error while registering.");
            }
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="main-content register-container">
                <div className="register">
                    <div className="header">
                        Signup
                    </div>
                    <form className="register-content" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="input-label">First Name</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="enter your first name" value={firstName} onChange={(e) => inputChangeHandler(e, "firstName")} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Last Name</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="enter your last name" value={lastName} onChange={(e) => inputChangeHandler(e, "lastName")} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Email address</label>
                            <div className="form-control">
                                <input type="email" className="input" placeholder="example@example.com" value={email} onChange={(e) => inputChangeHandler(e, "email")} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Password</label>
                            <div className="form-control">
                                <input type="password" className="input" placeholder="******" value={password} onChange={(e) => inputChangeHandler(e, "password")} required/>
                            </div>
                        </div>
                        <div className="form-field-section">
                            <div className="form-field form-field-horizontal">
                                <label className="form-control-horizontal font-md">
                                    <input type="checkbox" name="Label" value="Label" required/>
                                    <span className="input-label register-checkbox-label">I accept all Term & Conditions</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn product-btn bg-info white p-md"  type="submit" >Create New Account</button> 
                        <Link className="btn product-btn bg-charcoal-white charcoal-black p-md" to="/login">Already have an Account </Link> 
                    </form>
                    <div className='error'>
                        {error}
                    </div>
                </div>
            </div>   
        </div>
    );
}

export default Register;