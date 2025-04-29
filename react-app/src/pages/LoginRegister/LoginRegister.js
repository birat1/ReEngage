import React, { useState } from "react";
import './LoginRegister.css';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const registerLink = () => {
        setAction('active');
        setError('');
    };

    const loginLink = () => {
        setAction('');
        setError('');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const age = calculateAge(dob);

        if (age < 18) {
            setError('You must be at least 18 years old to register.');
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else {
            setError('');
            console.log('Registration successful');
            // Proceed with actual registration logic here
        }
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="login-register-container">
            <div className={`wrapper ${action}`}>
                {/* LOGIN FORM */}
                <div className="form-box login">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1>Login</h1>
                        <div className="inputbox">
                            <input type="text" placeholder='Username' required />
                        </div>
                        <div className="inputbox">
                            <input type="password" placeholder='Password' required />
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

                {/* REGISTER FORM */}
                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>
                        <div className="inputbox">
                            <input type="text" placeholder='Username' required />
                        </div>
                        <div className="inputbox">
                            <input type="email" placeholder='Email' required />
                        </div>
                        <div className="inputbox">
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="inputbox">
                            <input
                                type="date"
                                required
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" required /> I agree to the terms and conditions</label>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Register</button>
                        <div className="register-link">
                            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
