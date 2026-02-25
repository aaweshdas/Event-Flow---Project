import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import {
    Mail, Lock, User, Eye, EyeOff, Rocket, Calendar,
    Users, Award, ChevronRight, Sparkles, GraduationCap,
    AlertCircle
} from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const fillDemo = (role) => {
        if (role === 'student') {
            setEmail('24B11CS001@adityauniversity.in');
            setPassword('12345');
        } else {
            setEmail('aarav@aditya.edu');
            setPassword('12345');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let result;
            if (mode === 'login') {
                result = await login({ email, password });
            } else {
                // Ensure name and department are sent for registration
                if (!name || !department) {
                    setError("Please provide a name and department for registration.");
                    setLoading(false);
                    return;
                }

                // Client-side domain check (optional but good for UX)
                if (!email.endsWith('@adityauniversity.in')) {
                    setError("Registration requires a student email ending in @adityauniversity.in");
                    setLoading(false);
                    return;
                }

                result = await register({ name, email, password, department, role: 'student' });
            }

            if (result && !result.success) {
                setError(result.error || (mode === 'login' ? 'Invalid credentials' : 'Registration failed'));
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Link to="/" className="auth-logo">
                            <img src="/logo.png" alt="EventFlow Logo" className="auth-logo-image" />
                            <span>EventFlow</span>
                        </Link>
                        <h1 className="auth-headline">Your Gateway to<br /><span className="text-gradient">Campus Life</span></h1>
                        <p className="auth-tagline">Discover hackathons, workshops, cultural fests, and more. One platform to connect with your entire university community.</p>
                        <div className="auth-stats-row">
                            <div className="auth-stat"><Calendar size={18} /><div><strong>50+</strong><span>Events</span></div></div>
                            <div className="auth-stat"><Users size={18} /><div><strong>2k+</strong><span>Students</span></div></div>
                            <div className="auth-stat"><Award size={18} /><div><strong>100+</strong><span>Certificates</span></div></div>
                        </div>
                    </motion.div>
                    <motion.div className="auth-testimonial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <p>"EventFlow made it so easy to discover and register for campus events. I've attended 12 events this semester!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">R</div>
                            <div><strong>Rahul Sharma</strong><span>CSE, 3rd Year</span></div>
                        </div>
                    </motion.div>
                </div>
                <div className="auth-left-decor">
                    <div className="decor-circle c1"></div>
                    <div className="decor-circle c2"></div>
                    <div className="decor-circle c3"></div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="auth-right">
                <motion.div className="auth-form-wrapper" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className="auth-tabs">
                        <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError(''); }}>Sign In</button>
                        <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setError(''); }}>Register</button>
                        <div className={`tab-indicator ${mode === 'register' ? 'right' : ''}`} />
                    </div>
                    <div className="auth-form-header">
                        <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                        <p>{mode === 'login' ? 'Sign in to access your dashboard and events' : 'Join the university event community'}</p>
                    </div>
                    <AnimatePresence>
                        {error && (
                            <motion.div className="auth-error" initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}>
                                <AlertCircle size={16} /><span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <AnimatePresence mode="wait">
                            {mode === 'login' && (
                                <motion.div key="demo-chips" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="demo-chips">
                                    <button type="button" className="demo-chip" onClick={() => fillDemo('student')}>
                                        <User size={16} />
                                        <div><strong>Student Demo</strong><span>Prefills credentials</span></div>
                                    </button>
                                    <button type="button" className="demo-chip" onClick={() => fillDemo('admin')}>
                                        <Award size={16} />
                                        <div><strong>Admin Demo</strong><span>Prefills credentials</span></div>
                                    </button>
                                </motion.div>
                            )}
                            {mode === 'register' && (
                                <motion.div key="register-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="register-extra">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <div className="input-wrap"><User size={18} className="input-icon-el" /><input type="text" placeholder="Rahul Sharma" value={name} onChange={e => setName(e.target.value)} /></div>
                                    </div>
                                    <div className="input-group">
                                        <label>Department</label>
                                        <div className="input-wrap">
                                            <GraduationCap size={18} className="input-icon-el" />
                                            <select value={department} onChange={e => setDepartment(e.target.value)}>
                                                <option value="">Select Department</option>
                                                <option value="CSE">Computer Science</option>
                                                <option value="ECE">Electronics</option>
                                                <option value="ME">Mechanical</option>
                                                <option value="CE">Civil</option>
                                                <option value="MBA">Business Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="input-group">
                            <label>University Email</label>
                            <div className="input-wrap">
                                <Mail size={18} className="input-icon-el" />
                                <input
                                    type="email"
                                    placeholder={mode === 'register' ? "rollnumber@adityauniversity.in" : "you@aditya.edu or rollnumber@adityauniversity.in"}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <p className="input-hint">
                                {mode === 'register' ? "Students: Use @adityauniversity.in" : "Admins: @aditya.edu | Students: @adityauniversity.in"}
                            </p>
                        </div>
                        <div className="input-group">
                            <div className="label-row"><label>Password</label>{mode === 'login' && <button type="button" className="forgot-link">Forgot?</button>}</div>
                            <div className="input-wrap">
                                <Lock size={18} className="input-icon-el" />
                                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                            </div>
                        </div>
                        <Button variant="primary" size="lg" className="w-full auth-submit" isLoading={loading}>{mode === 'login' ? 'Sign In' : 'Create Account'}<ChevronRight size={18} /></Button>
                    </form>

                    <p className="auth-switch">{mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}<button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'Register Now' : 'Sign In'}</button></p>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
