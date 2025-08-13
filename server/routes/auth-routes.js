const express = require('express');
const router = express.Router();
const {register,login,logout} = require('../controllers/auth-controller');
const {registerValidation,loginValidation} = require('../middleware/validators');
const {validationHandler} = require('../middleware/validation-handler');
const authMiddleware = require('../middleware/auth-middleware');

// Route: POST /api/auth/register
router.post('/register', registerValidation, validationHandler, register);

// Route: POST /api/auth/login
router.post('/login', loginValidation, validationHandler, login);

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


module.exports = router;