require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

mongoose.connect(process.env.MONGODB_URI);

const mockStudents = [
    { name: 'Student 24B11CS001', email: '24B11CS001@adityauniversity.in', password: '12345', role: 'student', department: 'Computer Science', studentId: '24B11CS001' }
];

const mockEvents = [
    {
        title: 'Tech Symposium 2024',
        date: '2024-03-15',
        time: '09:00 AM',
        location: 'Main Auditorium',
        category: 'Academic',
        capacity: 500,
        registered: 120,
        status: 'Upcoming',
        description: 'Annual technology symposium featuring industry leaders.',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'
    },
    {
        title: 'Cultural Fest',
        date: '2024-04-01',
        time: '04:00 PM',
        location: 'Campus Ground',
        category: 'Cultural',
        capacity: 1000,
        registered: 450,
        status: 'Upcoming',
        description: 'The biggest cultural festival of the year.',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80'
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();
        await Registration.deleteMany();

        const adminUser = {
            name: 'Aarav (Admin)',
            email: 'aarav@aditya.edu',
            password: '12345',
            role: 'admin',
            department: 'Administration',
            studentId: 'ADMIN1'
        };

        const createdUsers = await User.create([adminUser, ...mockStudents]);
        const adminId = createdUsers[0]._id;

        await Event.insertMany(mockEvents);

        console.log('Data Imported successfully! 🟢');
        console.log(`\n==== LOGIN CREDENTIALS ====`);
        console.log(`Admin Email: aarav@aditya.edu | Password: 12345`);
        console.log(`Student Email: 24B11CS001@adityauniversity.in | Password: 12345`);
        console.log(`===========================`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} 🔴`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();
        await Registration.deleteMany();

        console.log('Data Destroyed! 🔴');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message} 🔴`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
