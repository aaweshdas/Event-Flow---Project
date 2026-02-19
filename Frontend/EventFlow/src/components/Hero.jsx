import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">

            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-badge">
                        <span className="pulse-dot"></span>
                        University Event Portal 2026
                    </div>
                    <h1 className="hero-title">
                        Discover <span className="text-gradient">Extraordinary</span><br />
                        Campus Experiences
                    </h1>
                    <p className="hero-subtitle">
                        Join thousands of students in workshops, hackathons, and cultural fests.
                        Your gateway to university life starts here.
                    </p>

                    <div className="hero-actions">
                        <Link to="/events">
                            <Button size="lg" className="hero-btn">
                                Explore Events <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                        <Link to="/auth">
                            <Button variant="secondary" size="lg">
                                Student Login
                            </Button>
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <Calendar className="stat-icon" />
                            <div>
                                <strong>50+</strong>
                                <span>Active Events</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Users className="stat-icon" />
                            <div>
                                <strong>2k+</strong>
                                <span>Students Registered</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="visual-card-stack">
                        <div className="visual-card card-1">
                            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600" alt="Event 1" />
                        </div>
                        <div className="visual-card card-2">
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" alt="Event 2" />
                        </div>
                        <div className="visual-card card-3">
                            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600" alt="Event 3" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
