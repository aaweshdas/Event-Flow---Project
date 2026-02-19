import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import Button from '../components/ui/Button';
import {
    Calendar, Clock, MapPin, Users, BarChart3, TrendingUp,
    CheckCircle, ArrowRight, Ticket, Award, BookOpen,
    Search, Bell, Settings, LogOut, Plus, Eye, QrCode,
    GraduationCap, Star, ChevronRight
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { events } = useEvents();
    const [activeTab, setActiveTab] = useState('overview');
    const [registeredIds, setRegisteredIds] = useState(['evt-1', 'evt-2']);
    const [registeringId, setRegisteringId] = useState(null);

    if (!user) return (
        <div className="dash-login-prompt">
            <div className="prompt-card glass-panel">
                <GraduationCap size={48} />
                <h2>Access Your Dashboard</h2>
                <p>Login with your university credentials to manage events and track registrations.</p>
                <Link to="/auth"><Button variant="primary" size="lg">Login Now</Button></Link>
            </div>
        </div>
    );

    const handleQuickRegister = async (eventId) => {
        setRegisteringId(eventId);
        await new Promise(r => setTimeout(r, 800));
        setRegisteredIds(prev => [...prev, eventId]);
        setRegisteringId(null);
    };

    const isRegistered = (id) => registeredIds.includes(id);
    const myEvents = events.filter(e => isRegistered(e.id));
    const availableEvents = events.filter(e => !isRegistered(e.id));

    /* ─── Sidebar Nav Items ─── */
    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'my-events', label: 'My Events', icon: Ticket },
        { id: 'browse', label: 'Quick Register', icon: Plus },
        { id: 'certificates', label: 'Certificates', icon: Award },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const adminSidebarItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'manage-events', label: 'Manage Events', icon: Calendar },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'reports', label: 'Reports', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const navItems = user.role === 'admin' ? adminSidebarItems : sidebarItems;

    return (
        <div className="dashboard-layout">
            {/* ─── Sidebar ─── */}
            <aside className="dash-sidebar">
                <div className="sidebar-profile">
                    <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt="Avatar"
                        className="sidebar-avatar"
                    />
                    <h3 className="sidebar-name">{user.name}</h3>
                    <span className="sidebar-role">{user.role === 'admin' ? 'Administrator' : user.department || 'Student'}</span>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                            {activeTab === item.id && <div className="sidebar-active-bar" />}
                        </button>
                    ))}
                </nav>

                <button className="sidebar-link logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* ─── Main Content ─── */}
            <main className="dash-main">
                {/* Top Bar */}
                <header className="dash-topbar">
                    <div className="topbar-greeting">
                        <h1>
                            {user.role === 'admin' ? 'Admin Dashboard' : `Welcome, `}
                            {user.role !== 'admin' && <span className="text-gradient">{user.name.split(' ')[0]}</span>}
                        </h1>
                        <p>
                            {user.role === 'admin'
                                ? 'Platform overview and management'
                                : `${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                            }
                        </p>
                    </div>
                    <div className="topbar-actions">
                        <button className="topbar-icon-btn"><Bell size={20} /></button>
                        <button className="topbar-icon-btn"><Search size={20} /></button>
                    </div>
                </header>

                <div className="dash-content">
                    <AnimatePresence mode="wait">
                        {/* ─── STUDENT: Overview Tab ─── */}
                        {activeTab === 'overview' && user.role !== 'admin' && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                {/* Stats Row */}
                                <div className="stats-row">
                                    <div className="stat-card-v2">
                                        <div className="stat-icon-wrap indigo"><Ticket size={22} /></div>
                                        <div className="stat-info">
                                            <span className="stat-label">Registered Events</span>
                                            <span className="stat-value">{myEvents.length}</span>
                                        </div>
                                    </div>
                                    <div className="stat-card-v2">
                                        <div className="stat-icon-wrap emerald"><CheckCircle size={22} /></div>
                                        <div className="stat-info">
                                            <span className="stat-label">Attended</span>
                                            <span className="stat-value">8</span>
                                        </div>
                                    </div>
                                    <div className="stat-card-v2">
                                        <div className="stat-icon-wrap amber"><Award size={22} /></div>
                                        <div className="stat-info">
                                            <span className="stat-label">Certificates</span>
                                            <span className="stat-value">5</span>
                                        </div>
                                    </div>
                                    <div className="stat-card-v2">
                                        <div className="stat-icon-wrap rose"><Star size={22} /></div>
                                        <div className="stat-info">
                                            <span className="stat-label">Points Earned</span>
                                            <span className="stat-value">320</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Two-Column: Upcoming + Quick Register */}
                                <div className="dash-two-col">
                                    <section className="dash-section">
                                        <div className="section-head">
                                            <h2><Calendar size={20} /> Upcoming Events</h2>
                                            <button className="see-all" onClick={() => setActiveTab('my-events')}>See All <ChevronRight size={14} /></button>
                                        </div>
                                        <div className="upcoming-list">
                                            {myEvents.slice(0, 3).map((event, i) => (
                                                <div className="upcoming-card" key={event.id}>
                                                    <div className="upcoming-date">
                                                        <span className="up-day">{event.date.split('-')[2]}</span>
                                                        <span className="up-month">{new Date(event.date).toLocaleString('en', { month: 'short' }).toUpperCase()}</span>
                                                    </div>
                                                    <div className="upcoming-info">
                                                        <h4>{event.title}</h4>
                                                        <div className="upcoming-meta">
                                                            <span><Clock size={12} /> {event.time}</span>
                                                            <span><MapPin size={12} /> {event.venue}</span>
                                                        </div>
                                                    </div>
                                                    <div className="upcoming-status">
                                                        <span className="badge-confirmed"><CheckCircle size={14} /> Confirmed</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {myEvents.length === 0 && (
                                                <div className="empty-state">
                                                    <BookOpen size={32} />
                                                    <p>No registered events yet.</p>
                                                    <Button variant="primary" size="sm" onClick={() => setActiveTab('browse')}>Browse Events</Button>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <section className="dash-section">
                                        <div className="section-head">
                                            <h2><Plus size={20} /> Quick Register</h2>
                                            <Link to="/events" className="see-all">All Events <ChevronRight size={14} /></Link>
                                        </div>
                                        <div className="quick-register-list">
                                            {availableEvents.slice(0, 3).map(event => (
                                                <div className="qr-card" key={event.id}>
                                                    <img src={event.image} alt={event.title} className="qr-img" />
                                                    <div className="qr-info">
                                                        <span className="qr-cat">{event.category}</span>
                                                        <h4>{event.title}</h4>
                                                        <span className="qr-date"><Calendar size={12} /> {event.date}</span>
                                                    </div>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        isLoading={registeringId === event.id}
                                                        onClick={() => handleQuickRegister(event.id)}
                                                    >
                                                        Register
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </motion.div>
                        )}

                        {/* ─── STUDENT: My Events Tab ─── */}
                        {activeTab === 'my-events' && (
                            <motion.div key="my-events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="section-head">
                                    <h2><Ticket size={20} /> My Registered Events ({myEvents.length})</h2>
                                </div>
                                <div className="my-events-grid">
                                    {myEvents.map(event => (
                                        <div className="my-event-card glass-panel" key={event.id}>
                                            <div className="mec-image">
                                                <img src={event.image} alt={event.title} />
                                                <span className="mec-badge">{event.category}</span>
                                            </div>
                                            <div className="mec-body">
                                                <h3>{event.title}</h3>
                                                <div className="mec-meta">
                                                    <span><Calendar size={14} /> {event.date}</span>
                                                    <span><Clock size={14} /> {event.time}</span>
                                                    <span><MapPin size={14} /> {event.venue}</span>
                                                </div>
                                                <div className="mec-footer">
                                                    <span className="badge-confirmed"><CheckCircle size={14} /> Confirmed</span>
                                                    <div className="mec-actions">
                                                        <Link to={`/events/${event.id}`}>
                                                            <Button variant="ghost" size="sm"><Eye size={14} /> View</Button>
                                                        </Link>
                                                        <Button variant="ghost" size="sm"><QrCode size={14} /> Ticket</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ─── STUDENT: Browse / Quick Register Tab ─── */}
                        {activeTab === 'browse' && (
                            <motion.div key="browse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="section-head">
                                    <h2><Plus size={20} /> Quick Register for Events</h2>
                                </div>
                                <p className="section-desc">Register for upcoming events with a single click.</p>
                                <div className="browse-grid">
                                    {availableEvents.slice(0, 9).map(event => (
                                        <div className="browse-card glass-panel" key={event.id}>
                                            <img src={event.image} alt={event.title} className="browse-img" />
                                            <div className="browse-body">
                                                <span className="browse-cat">{event.category}</span>
                                                <h4>{event.title}</h4>
                                                <div className="browse-meta">
                                                    <span><Calendar size={12} /> {event.date}</span>
                                                    <span><MapPin size={12} /> {event.venue}</span>
                                                </div>
                                                <div className="browse-capacity">
                                                    <div className="cap-bar"><div className="cap-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div></div>
                                                    <span>{event.registered}/{event.capacity} spots</span>
                                                </div>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="w-full"
                                                    isLoading={registeringId === event.id}
                                                    onClick={() => handleQuickRegister(event.id)}
                                                >
                                                    Register Now <ArrowRight size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ─── Certificates Tab ─── */}
                        {activeTab === 'certificates' && (
                            <motion.div key="certs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="section-head"><h2><Award size={20} /> My Certificates</h2></div>
                                <div className="certs-grid">
                                    {['Innovation Summit 2025', 'Code Hackathon 2025', 'Tech Workshop', 'Leadership Seminar', 'AI/ML Bootcamp'].map((name, i) => (
                                        <div className="cert-card glass-panel" key={i}>
                                            <div className="cert-icon"><Award size={32} /></div>
                                            <h4>{name}</h4>
                                            <p>Issued: Jan {10 + i}, 2026</p>
                                            <Button variant="outline" size="sm">Download PDF</Button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ─── Settings Tab ─── */}
                        {activeTab === 'settings' && (
                            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="section-head"><h2><Settings size={20} /> Account Settings</h2></div>

                                {/* ── Profile Information ── */}
                                <div className="settings-section">
                                    <h3 className="settings-section-title"><Users size={16} /> Profile Information</h3>
                                    <div className="settings-card glass-panel">
                                        <div className="settings-avatar-row">
                                            <img
                                                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                                alt="Avatar"
                                                className="settings-avatar"
                                            />
                                            <div className="settings-avatar-actions">
                                                <Button variant="outline" size="sm">Change Photo</Button>
                                                <span className="settings-hint">JPG, PNG or GIF. Max 2MB.</span>
                                            </div>
                                        </div>

                                        <div className="settings-grid">
                                            <div className="settings-row">
                                                <label>Full Name</label>
                                                <input type="text" defaultValue={user.name} className="settings-input" />
                                            </div>
                                            <div className="settings-row">
                                                <label>Email Address</label>
                                                <input type="email" defaultValue={user.email} className="settings-input" readOnly />
                                                <span className="settings-hint">Managed by university. Contact admin to change.</span>
                                            </div>
                                            <div className="settings-row">
                                                <label>Phone Number</label>
                                                <input type="tel" defaultValue={user.phone || ''} placeholder="+91 00000 00000" className="settings-input" />
                                            </div>
                                            <div className="settings-row">
                                                <label>Department</label>
                                                <input type="text" defaultValue={user.department || 'Computer Science'} className="settings-input" />
                                            </div>
                                            {user.role !== 'admin' && (
                                                <>
                                                    <div className="settings-row">
                                                        <label>Student ID</label>
                                                        <input type="text" defaultValue={user.studentId || 'N/A'} className="settings-input" readOnly />
                                                    </div>
                                                    <div className="settings-row">
                                                        <label>Semester</label>
                                                        <input type="text" defaultValue={user.semester || ''} className="settings-input" />
                                                    </div>
                                                    <div className="settings-row">
                                                        <label>Enrollment Year</label>
                                                        <input type="text" defaultValue={user.enrollmentYear || '2024'} className="settings-input" readOnly />
                                                    </div>
                                                    <div className="settings-row">
                                                        <label>Role</label>
                                                        <input type="text" defaultValue="Student" className="settings-input" readOnly />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <Button variant="primary">Save Profile</Button>
                                    </div>
                                </div>

                                {/* ── Notifications & Security — side by side ── */}
                                <div className="settings-two-col">
                                    <div className="settings-section">
                                        <h3 className="settings-section-title"><Bell size={16} /> Notifications</h3>
                                        <div className="settings-card glass-panel">
                                            <div className="settings-toggle-row">
                                                <div className="toggle-info">
                                                    <span className="toggle-label">Email Notifications</span>
                                                    <span className="toggle-desc">Event reminders and updates via email</span>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            <div className="settings-toggle-row">
                                                <div className="toggle-info">
                                                    <span className="toggle-label">Push Notifications</span>
                                                    <span className="toggle-desc">Browser alerts for upcoming events</span>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            <div className="settings-toggle-row">
                                                <div className="toggle-info">
                                                    <span className="toggle-label">Event Recommendations</span>
                                                    <span className="toggle-desc">Personalized suggestions based on interests</span>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-section">
                                        <h3 className="settings-section-title"><Eye size={16} /> Security</h3>
                                        <div className="settings-card glass-panel">
                                            <div className="settings-row" style={{ marginBottom: '1rem' }}>
                                                <label>Current Password</label>
                                                <input type="password" placeholder="Enter current password" className="settings-input" />
                                            </div>
                                            <div className="settings-row" style={{ marginBottom: '1.25rem' }}>
                                                <label>New Password</label>
                                                <input type="password" placeholder="Enter new password" className="settings-input" />
                                            </div>
                                            <Button variant="primary" size="sm">Change Password</Button>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        )}

                        {/* ─── ADMIN: Overview Tab ─── */}
                        {activeTab === 'overview' && user.role === 'admin' && (
                            <motion.div key="admin-overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="stats-row">
                                    <div className="stat-card-v2"><div className="stat-icon-wrap indigo"><Users size={22} /></div><div className="stat-info"><span className="stat-label">Total Students</span><span className="stat-value">2,450</span></div></div>
                                    <div className="stat-card-v2"><div className="stat-icon-wrap emerald"><Calendar size={22} /></div><div className="stat-info"><span className="stat-label">Active Events</span><span className="stat-value">56</span></div></div>
                                    <div className="stat-card-v2"><div className="stat-icon-wrap amber"><BarChart3 size={22} /></div><div className="stat-info"><span className="stat-label">Registrations</span><span className="stat-value">1,208</span></div></div>
                                    <div className="stat-card-v2"><div className="stat-icon-wrap rose"><TrendingUp size={22} /></div><div className="stat-info"><span className="stat-label">Engagement</span><span className="stat-value">+18%</span></div></div>
                                </div>

                                <section className="dash-section">
                                    <div className="section-head">
                                        <h2>Recent Events</h2>
                                        <Button variant="primary" size="sm"><Plus size={14} /> Create Event</Button>
                                    </div>
                                    <div className="admin-table-wrap glass-panel">
                                        <table className="admin-table">
                                            <thead>
                                                <tr><th>Event Name</th><th>Date</th><th>Category</th><th>Registrations</th><th>Status</th><th>Action</th></tr>
                                            </thead>
                                            <tbody>
                                                {events.slice(0, 8).map(event => (
                                                    <tr key={event.id}>
                                                        <td className="td-event"><img src={event.image} alt="" className="td-img" />{event.title}</td>
                                                        <td>{event.date}</td>
                                                        <td><span className="td-cat">{event.category}</span></td>
                                                        <td>
                                                            <div className="td-bar-wrap">
                                                                <div className="td-bar"><div className="td-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div></div>
                                                                <span>{event.registered}/{event.capacity}</span>
                                                            </div>
                                                        </td>
                                                        <td><span className="badge-active">Active</span></td>
                                                        <td><Link to={`/events/${event.id}`}><Button variant="ghost" size="sm"><Eye size={14} /></Button></Link></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {/* Admin manage/students/reports tabs – placeholders */}
                        {(activeTab === 'manage-events' || activeTab === 'students' || activeTab === 'reports') && (
                            <motion.div key="admin-placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="empty-state" style={{ marginTop: '4rem' }}>
                                    <Settings size={48} />
                                    <h3>Coming Soon</h3>
                                    <p>This section is under development.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
