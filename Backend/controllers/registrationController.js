const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private (Student)
const registerForEvent = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user._id;

    try {
        // 1. Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // 2. Check if already registered
        const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // 3. Atomically check capacity and increment registered count
        // We use findOneAndUpdate with a condition to ensure we don't exceed capacity
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, registered: { $lt: event.capacity } },
            { $inc: { registered: 1 } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(400).json({ message: 'Event is at full capacity' });
        }

        // 4. Create registration record
        const registration = await Registration.create({
            user: userId,
            event: eventId,
            status: 'registered'
        });

        res.status(201).json({
            message: 'Successfully registered for event',
            registration,
            event: updatedEvent
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// @desc    Get current user's registrations
// @route   GET /api/registrations
// @access  Private
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate('event')
            .sort({ createdAt: -1 });

        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching registrations', error: error.message });
    }
};

// @desc    Cancel a registration
// @route   DELETE /api/registrations/:id
// @access  Private
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Check ownership
        if (registration.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to cancel this registration' });
        }

        // Decrement event registered count
        await Event.findByIdAndUpdate(registration.event, { $inc: { registered: -1 } });

        await registration.deleteOne();

        res.status(200).json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error cancelling registration', error: error.message });
    }
};

module.exports = {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
};
