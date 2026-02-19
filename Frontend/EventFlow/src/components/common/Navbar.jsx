import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
import styles from './Navbar.module.css';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={styles.navbar}>
            <div className={clsx('container', styles.container)}>
                <Link to="/" className={styles.brand}>
                    <GraduationCap size={32} className={styles.logoIcon} />
                    <div className={styles.brandText}>
                        <span className={styles.brandName}>Aditya University</span>
                        <span className={styles.brandTagline}>EventFlow Portal</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link to="/" className={clsx(styles.navLink, isActive('/') && styles.active)}>Home</Link>
                    <Link to="/events" className={clsx(styles.navLink, isActive('/events') && styles.active)}>Events</Link>
                    <Link to="/auth" className={styles.loginBtn}>
                        <Button variant="secondary" className={styles.smallBtn}>Login</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMenu}>
                    {isOpen ? <X color="white" /> : <Menu color="white" />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <Link to="/" className={styles.mobileLink} onClick={toggleMenu}>Home</Link>
                        <Link to="/events" className={styles.mobileLink} onClick={toggleMenu}>Events</Link>
                        <Link to="/auth" className={styles.mobileLink} onClick={toggleMenu}>Student Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
