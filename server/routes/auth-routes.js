const express = require('express');
const router = express.Router();
const {register,login,logout} = require('../controllers/auth-controller');
const {registerValidation,loginValidation} = require('../middleware/validators');
const {validationHandler} = require('../middleware/validation-handler');
const authMiddleware = require('../middleware/auth-middleware');
const User = require('../models/user-model');

// Route: POST /api/auth/register
router.post('/signup', registerValidation, validationHandler, register);

// Route: POST /api/auth/login
router.post('/signin', loginValidation, validationHandler, login);

//Route: POST /api/auth/logout
// Route: POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.json({ message: 'Logged out successfully' });
});

// Check current logged in user
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ uuid: req.user.uuid }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error in /me route:", err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;