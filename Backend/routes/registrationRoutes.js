const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getMyRegistrations)
    .post(protect, registerForEvent);

router.route('/:id')
    .delete(protect, cancelRegistration);

module.exports = router;
