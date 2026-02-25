const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        // Format to match frontend structure where id is _id
        const formattedEvents = events.map(event => ({
            id: event._id.toString(),
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            capacity: event.capacity,
            registered: event.registered,
            image: event.imageUrl,
            description: event.description || '',
            status: event.status
        }));
        res.status(200).json(formattedEvents);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const formattedEvent = {
            id: event._id.toString(),
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            capacity: event.capacity,
            registered: event.registered,
            image: event.imageUrl,
            description: event.description || '',
            status: event.status
        };

        res.status(200).json(formattedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID or error', error: error.message });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        const formattedEvent = {
            id: event._id.toString(),
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            capacity: event.capacity,
            registered: event.registered,
            image: event.imageUrl,
            description: event.description || '',
            status: event.status
        };

        res.status(201).json(formattedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create event', error: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        const formattedEvent = {
            id: updatedEvent._id.toString(),
            ...updatedEvent._doc
        };
        delete formattedEvent._id;
        delete formattedEvent.__v;
        // Rename imageUrl to image for frontend consistency
        if (formattedEvent.imageUrl) {
            formattedEvent.image = formattedEvent.imageUrl;
            delete formattedEvent.imageUrl;
        }

        res.status(200).json(formattedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update event', error: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
