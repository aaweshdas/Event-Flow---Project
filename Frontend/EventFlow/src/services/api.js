// Mock Data Generation
const CATEGORIES = ['Academic', 'Technology', 'Sports', 'Cultural', 'Workshop', 'Seminar', 'Club Activity'];
const VENUES = ['Main Auditorium', 'Engineering Block B', 'University Stadium', 'Library Conference Hall', 'Student Center', 'Online'];

const MOCK_SAMPLES = [
    // Academic
    { title: 'Annual Research Symposium', category: 'Academic', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Mathematics Olympiad 2026', category: 'Academic', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Science & Innovation Fair', category: 'Academic', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000' },

    // Technology
    { title: 'AI & Robotics Hackathon', category: 'Technology', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Full Stack Coding Bootcamp', category: 'Technology', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Cybersecurity Awareness Workshop', category: 'Technology', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' },

    // Sports
    { title: 'Inter-Department Football Cup', category: 'Sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?auto=format&fit=crop&q=80&w=1000' },
    { title: 'University Marathon 2026', category: 'Sports', image: 'https://images.unsplash.com/photo-1552674605-1e94dd2690f8?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Badminton Championship', category: 'Sports', image: 'https://images.unsplash.com/photo-1626224583764-84786c719719?auto=format&fit=crop&q=80&w=1000' },

    // Cultural
    { title: 'Grand Music Festival', category: 'Cultural', image: 'https://images.unsplash.com/photo-1459749411177-0473ef71607b?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Classical Dance Competition', category: 'Cultural', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Art & Photography Exhibition', category: 'Cultural', image: 'https://images.unsplash.com/photo-1460661631046-5b8b5abbd206?auto=format&fit=crop&q=80&w=1000' },

    // Workshop
    { title: 'Digital Marketing Masterclass', category: 'Workshop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Creative Writing Workshop', category: 'Workshop', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Pottery & Craft Workshop', category: 'Workshop', image: 'https://images.unsplash.com/photo-1565193566173-7a64b27876e9?auto=format&fit=crop&q=80&w=1000' },

    // Seminar
    { title: 'Future of AI Seminar', category: 'Seminar', image: 'https://images.unsplash.com/photo-1544531584-98d9b13c8941?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Mental Health Awareness Talk', category: 'Seminar', image: 'https://images.unsplash.com/photo-1544928147-79a77456a1d3?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Entrepreneurship Summit', category: 'Seminar', image: 'https://images.unsplash.com/photo-1475721027767-4d529c14c908?auto=format&fit=crop&q=80&w=1000' },

    // Club Activity
    { title: 'Debate Club Open Mic', category: 'Club Activity', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Chess Club Tournament', category: 'Club Activity', image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=1000' },
    { title: 'Eco-Club Campus Cleanup', category: 'Club Activity', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000' }
];

const generateEvents = () => {
    let events = [];

    // Add specific samples first
    MOCK_SAMPLES.forEach((sample, index) => {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1); // Next 30 days

        events.push({
            id: `evt-sample-${index + 1}`,
            title: sample.title,
            date: date.toISOString().split('T')[0],
            time: `${9 + (index % 8)}:00 AM`,
            venue: VENUES[index % VENUES.length],
            category: sample.category,
            description: `Join us for the ${sample.title}. This is a premier event under the ${sample.category} category. Don't miss out on this opportunity to learn and network.`,
            image: sample.image,
            capacity: 50 + (index * 5),
            registered: Math.floor(Math.random() * 40)
        });
    });

    // Generate random filler events to reach ~50 total if needed (optional, keeping it clean with samples + some extras)
    const extraCount = 60 - events.length;
    for (let i = 0; i < extraCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 60));
        const cat = CATEGORIES[i % CATEGORIES.length];

        events.push({
            id: `evt-gen-${i + 1}`,
            title: `${cat} Meetup ${i + 1}`,
            date: date.toISOString().split('T')[0],
            time: `10:00 AM`,
            venue: VENUES[i % VENUES.length],
            category: cat,
            description: `A general gathering for ${cat} enthusiasts.`,
            image: MOCK_SAMPLES.find(s => s.category === cat)?.image || 'https://via.placeholder.com/400',
            capacity: 60,
            registered: Math.floor(Math.random() * 20)
        });
    }

    return events;
};

const MOCK_EVENTS = generateEvents();

const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getEvents: async (page = 1, limit = 9, filters = {}) => {
        await mockDelay(600); // Simulate network

        let filtered = [...MOCK_EVENTS];

        // Apply filters
        if (filters.category && filters.category !== 'All') {
            filtered = filtered.filter(e => e.category === filters.category);
        }
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query)
            );
        }

        // Pagination Logic
        const total = filtered.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filtered.slice(start, end);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    },

    getEventById: async (id) => {
        await mockDelay(300);
        const event = MOCK_EVENTS.find(e => e.id === id);
        if (!event) throw new Error('Event not found');
        return event;
    },

    login: async (credentials) => {
        await mockDelay(1000);
        if (credentials.email.includes('student') || credentials.email === 'student@aditya.edu') {
            return {
                id: 's1',
                name: 'Rahul Kumar',
                role: 'student',
                email: credentials.email,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
                department: 'Computer Science',
                phone: '+91 98765 43210',
                studentId: 'ADT2024CS0142',
                enrollmentYear: '2024',
                semester: '4th Semester',
                bio: 'Passionate about technology and innovation. Active member of the coding club.',
                linkedin: 'linkedin.com/in/rahulkumar',
                github: 'github.com/rahulkumar',
                dateOfBirth: '2004-08-15',
                bloodGroup: 'O+',
                address: 'Hostel Block C, Room 204, Aditya University Campus'
            };
        }
        if (credentials.email.includes('admin') || credentials.email === 'admin@aditya.edu') {
            return {
                id: 'a1',
                name: 'Dr. Admin',
                role: 'admin',
                email: credentials.email,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
            };
        }
        throw new Error('Invalid Credentials (Try student@aditya.edu)');
    },

    registerForEvent: async (eventId) => {
        await mockDelay(800);
        return { success: true, message: 'Registration Successful!' };
    }
};
