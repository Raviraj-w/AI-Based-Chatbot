import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({ users: 0, chats: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/api/admin/stats');
                setDashboardData(res.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    // Stat cards sathi data
    const stats = [
        { label: 'Total Users', value: dashboardData.users, icon: '👥', color: '#4f46e5' },
        { label: 'Active Chats', value: dashboardData.chats, icon: '💬', color: '#10b981' },
        { label: 'System Load', value: '14%', icon: '⚡', color: '#f59e0b' }
    ];

    return (
        <div className="admin-wrapper">
            {/* Sidebar Section */}
            <aside className="admin-sidebar">
                <div className="admin-logo-section">
                    <div className="admin-icon">A</div>
                    <span className="admin-brand">Control Panel</span>
                </div>
                
                <nav className="admin-nav">
                    <div className="nav-link active">📊 Statistics</div>
                    <div className="nav-link">👤 Users</div>
                    <div className="nav-link">⚙️ Settings</div>
                </nav>

                <div className="admin-profile-box">
                    <div className="admin-avatar-circle">RW</div>
                    <div className="admin-name-tag">
                        <p>Raviraj W.</p>
                        <span>Root Admin</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Section */}
            <main className="admin-main">
                <header className="admin-top-nav">
                    <h2>Overview</h2>
                    <button className="sync-btn">Sync Data</button>
                </header>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((s, index) => (
                        <div key={index} className="stat-card-glass">
                            <div className="stat-header">
                                <span className="s-icon" style={{background: s.color + '22', color: s.color}}>{s.icon}</span>
                                <p>{s.label}</p>
                            </div>
                            <h3>{s.value}</h3>
                        </div>
                    ))}
                </div>

                {/* User Table Card */}
                <div className="table-card-glass">
                    <h3>Recent Registrations</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Raviraj Waingade</strong></td>
                                <td>raviraj@test.com</td>
                                <td><span className="badge-online">Online</span></td>
                                <td><button className="edit-btn">Manage</button></td>
                            </tr>
                            <tr>
                                <td><strong>Student User</strong></td>
                                <td>student@kit.edu</td>
                                <td><span className="badge-offline">Offline</span></td>
                                <td><button className="edit-btn">Manage</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;