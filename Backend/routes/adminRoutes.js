const express = require('express');
const router = express.Router();
const { getStudents, getReports } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/students', protect, admin, getStudents);
router.get('/reports', protect, admin, getReports);

module.exports = router;
