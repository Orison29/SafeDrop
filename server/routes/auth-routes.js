const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/auth-controller');
const {registerValidation,loginValidation} = require('../middleware/validators');
const {validationHandler} = require('../middleware/validation-handler');

// Route: POST /api/auth/register
router.post('/register', registerValidation, validationHandler, register);

// Route: POST /api/auth/login
router.post('/login', loginValidation, validationHandler, login);

module.exports = router;