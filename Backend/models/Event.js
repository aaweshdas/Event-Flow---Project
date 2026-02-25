const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    date: {
        type: String, // Kept as string to align with current frontend mocks, but Date is preferred for real backends
        required: [true, 'Please add a date']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity'],
        min: [1, 'Capacity must be at least 1']
    },
    registered: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
