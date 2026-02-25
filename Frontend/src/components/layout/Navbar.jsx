import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, User, LogOut, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import NotificationDropdown from '../ui/NotificationDropdown';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth(); // Assuming AuthContext provides user/logout

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
    ];

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <img src="/logo.png" alt="EventFlow Logo" className="logo-image" />
                    <span className="logo-text">EventFlow</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div className="active-indicator" layoutId="underline" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="nav-actions desktop-only" style={{ position: 'relative' }}>
                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Link to="/dashboard" style={{ marginRight: '16px' }}>
                                <Button variant="ghost" size="sm" className="nav-dashboard-btn">
                                    <User size={16} className="mr-2" />
                                    Dashboard
                                </Button>
                            </Link>

                            <button className="nav-icon-btn" id="nav-notification-btn" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                                <Bell size={18} />
                            </button>
                            <button className="nav-icon-btn">
                                <Search size={18} />
                            </button>
                            <NotificationDropdown
                                isOpen={isNotificationOpen}
                                onClose={() => setIsNotificationOpen(false)}
                                toggleButtonId="nav-notification-btn"
                            />
                        </div>
                    ) : (
                        <Link to="/auth">
                            <Button variant="primary" size="sm">Login / Register</Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu glass-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="mobile-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mobile-actions">
                                {user ? (
                                    <>
                                        <Link to="/dashboard" className="mobile-link">Dashboard</Link>
                                        <button onClick={logout} className="mobile-link text-left">Logout</button>
                                    </>
                                ) : (
                                    <Link to="/auth">
                                        <Button variant="primary" className="w-full">Login</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
