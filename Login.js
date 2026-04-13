// Login.js - Ultra Modern Version
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/login', { email, password });
            localStorage.setItem('user_id', res.data.user_id);
            navigate('/dashboard');
        } catch (err) {
            alert("Credentials match hot nahit. Please check kara.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="premium-card">
                {/* 3D-Style Bot Logo */}
                <div className="bot-icon-container">
                    <div className="bot-icon">
                        <svg viewBox="0 0 24 24" width="45" height="45" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 8V4H8"></path>
                            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                            <path d="M2 14h2"></path>
                            <path d="M20 14h2"></path>
                            <path d="M15 13v2"></path>
                            <path d="M9 13v2"></path>
                        </svg>
                    </div>
                </div>

                <div className="header-text">
                    <h1>Welcome Back</h1>
                    <p>Your AI workspace is ready.</p>
                </div>

                <form onSubmit={handleLogin} className="modern-form">
                    <div className="input-field">
                        <label>Email Address</label>
                        <input type="email" placeholder="name@domain.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="glow-button">Continue to Chat</button>
                </form>

                <div className="auth-footer">
                    <p>New to AI Chat? <span onClick={() => navigate('/signup')}>Create Account</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;