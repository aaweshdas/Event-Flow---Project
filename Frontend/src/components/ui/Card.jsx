import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
    return (
        <motion.div
            className={`card glass-panel ${className}`}
            whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
