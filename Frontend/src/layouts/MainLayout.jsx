import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';

const MainLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1] // ease-out-expo
                }}
                style={{ flex: 1, paddingTop: '80px' }}
            >
                <Outlet />
            </motion.main>
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-muted)'
            }}>
                <p>&copy; 2026 EventFlow - University Event Portal</p>
            </footer>
        </div>
    );
};

export default MainLayout;
