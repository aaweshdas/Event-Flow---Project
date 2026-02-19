import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../common/Button';
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={event.image} alt={event.title} className={styles.image} />
                <span className={styles.category}>{event.category}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{event.title}</h3>

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <Calendar size={16} className={styles.icon} />
                        <span>{event.date} • {event.time}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <MapPin size={16} className={styles.icon} />
                        <span>{event.venue}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <Users size={16} className={styles.icon} />
                        <span>{event.capacity - event.registered} seats left</span>
                    </div>
                </div>

                <Link to={`/events/${event.id}`}>
                    <Button variant="outline" className={styles.button}>View Details</Button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
