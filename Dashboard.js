// Dashboard.js - Modern Chat Interface
import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I am your AI Based Chatbot. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [conversationId, setConversationId] = useState(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        try {
            const userId = localStorage.getItem('user_id') || 1; // Default to 1 if not logged in
            const res = await axios.post('http://127.0.0.1:5000/api/chat', { 
                message: currentInput,
                user_id: userId,
                conversation_id: conversationId 
            });
            
            if (res.data.conversation_id) {
                setConversationId(res.data.conversation_id);
            }
            
            setMessages(prev => [...prev, { sender: 'bot', text: res.data.response }]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'bot', text: "Backend connection error." }]);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <aside className="glass-sidebar">
                <div className="sidebar-top">
                    <div className="sidebar-logo">
                        <div className="mini-bot-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2.5">
                                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                <path d="M12 8V4H8"></path>
                            </svg>
                        </div>
                       
                        <span className="brand-name">AI Based Chatbot</span>
                    </div>

                    <button className="new-chat-glow" onClick={() => setMessages([{ sender: 'bot', text: 'New session started.' }])}>
                        + New Chat
                    </button>
                    
                    <div className="history-list">
                        <p className="label">Conversations</p>
                        <div className="history-item active">Current Session</div>
                    </div>
                </div>

                <div className="sidebar-profile">
                    <div className="profile-info">
                        <div className="avatar">RV</div>
                        <div className="user-details">
                            <p className="user-name">Raviraj W.</p>
                            <p className="user-status">Standard User</p>
                        </div>
                    </div>
                    <button className="logout-icon-btn" title="Logout">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </aside>

            <main className="chat-main">
                <header className="chat-header">
                    <h3>AI System Interface</h3>
                    <div className="header-actions">
                        <div className="status-dot online"></div>
                        <span>V1.0 Online</span>
                    </div>
                </header>

                <div className="messages-container">
                    {messages.map((msg, i) => (
                        <div key={i} className={`msg-wrapper ${msg.sender}`}>
                            {msg.sender === 'bot' && <div className="bot-avatar-mini">AI</div>}
                            <div className="bubble">{msg.text}</div>
                        </div>
                    ))}
                </div>

                <div className="input-section">
                    <div className="input-glass-box">
                        <input 
                            type="text" 
                            placeholder="Ask me anything..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="send-glow-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;