import React, { useState } from "react";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>Login</h1>
                    <div className="inputbox">
                        <input type="text" placeholder='Username' required />
                        <FaUser />
                    </div>
                    <div className="inputbox">
                        <input type="password" placeholder='Password' required />
                        <FaLock />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>Registration</h1>
                    <div className="inputbox">
                        <input type="text" placeholder='Username' required />
                        <FaUser />
                    </div>
                    <div className="inputbox">
                        <input type="email" placeholder='Email' required />
                        <FaEnvelope />
                    </div>
                    <div className="inputbox">
                        <input type="password" placeholder='Password' required />
                        <FaLock />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> I agree to the terms and conditions</label>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
