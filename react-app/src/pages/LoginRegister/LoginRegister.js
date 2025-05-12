import React, { useState } from "react";
import './LoginRegister.css';
import { backendAPI } from "../../constants.js";

const LoginRegister = () => {
    const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [username, setUsername] = useState('');

    const showRegister = () => {
        setView('register');
        setError('');
    };

    const showLogin = () => {
        setView('login');
        setError('');
        setResetMessage('');
        setResetEmail('');
    };

    const showForgotPassword = () => {
        setView('forgot');
        setResetMessage('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const age = calculateAge(dob);

        if (!firstName.trim() || !lastName.trim()) {
            setError('First name and last name are required.');
        } else if (age < 18) {
            setError('You must be at least 18 years old to register.');
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else if (!username.trim()) {
            setError('Username is required.');
        } else {
            setError('');
            try {
                // Fetch CSRF token
                const csrfResponse = await fetch(`${backendAPI}api/csrf/`, {
                    credentials: 'include',
                    mode: 'cors',
                });
                const csrfData = await csrfResponse.json();
                const csrfToken = csrfData.csrfToken;

                // Send registration data to the backend
                const response = await fetch(`${backendAPI}api/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        username,
                        email: username, // Assuming username is the email
                        password,
                        dob,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Registration successful:', data);
                    // Redirect to login page after successful registration
                    showLogin();
                } else {
                    console.error('Registration failed:', data.error);
                    setError(data.error || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const csrfResponse = await fetch(`${backendAPI}api/csrf/`, {
                credentials: 'include',
                mode: 'cors'
            });
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;
    
            const response = await fetch(`${backendAPI}api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Handle successful login (e.g., redirect, save token, etc.)
                window.location.href = '/dashboard'; 
            } else {
                console.error('Login failed:', data.error);
                setError(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
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
            <div className={`wrapper ${view === 'register' ? 'active' : ''}`}>
                {/* LOGIN FORM */}
                {view === 'login' && (
                    <div className="form-box login">
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="inputbox">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" /> Remember me</label>
                                <a href="#" onClick={showForgotPassword}>Forgot password?</a>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">Login</button>
                            <div className="register-link">
                                <p>Don't have an account? <a href="#" onClick={showRegister}>Register</a></p>
                            </div>
                        </form>
                    </div>
                )}

                {/* REGISTER FORM */}
                {view === 'register' && (
                    <div className="form-box register">
                        <form onSubmit={handleRegister}>
                            <h1>Registration</h1>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="inputbox">
                                <input type="email" placeholder="Email" required />
                            </div>
                            <div className="inputbox">
                                <input
                                    type="password"
                                    placeholder="Password"
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
                                <p>Already have an account? <a href="#" onClick={showLogin}>Login</a></p>
                            </div>
                        </form>
                    </div>
                )}

                {/* FORGOT PASSWORD FORM */}
                {view === 'forgot' && (
                    <div className="form-box forgot">
                        <h1>Reset Password</h1>
                        <p className="info-message">
                            Please contact ReEngage for assistance with resetting your password.
                        </p>
                        <div className="register-link">
                            <p>Back to <a href="#" onClick={showLogin}>Login</a></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
