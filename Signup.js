// Signup.js - Premium Version (Matches Login Theme)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // We will use a separate CSS or same style

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/signup', userData);
            alert("Account created successfully!");
            navigate('/login'); 
        } catch (error) {
            alert("Signup failed. Email might already exist.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="premium-card">
                {/* Same Bot Logo for Branding */}
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
                    <h1>Join the Future</h1>
                    <p>Create your account to start chatting.</p>
                </div>

                <form onSubmit={handleSignup} className="modern-form">
                    <div className="input-field">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Raviraj Waingade" 
                            onChange={(e) => setUserData({...userData, username: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="input-field">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@domain.com" 
                            onChange={(e) => setUserData({...userData, email: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={(e) => setUserData({...userData, password: e.target.value})} 
                            required 
                        />
                    </div>
                    <button type="submit" className="glow-button">Create Account</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;