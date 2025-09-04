const express = require('express')
const router = express.Router();
const authController = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


// Public
router.post('/register', authController.register);
router.post('/login', authController.login);


// Example protected route
router.get('/me', protect, (req, res) => {
    res.status(200).json({ userId: req.user.id, message: "Protected route access granted" });
});

module.exports = router;