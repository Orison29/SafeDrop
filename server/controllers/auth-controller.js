const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const JWT_SECRETKEY = process.env.JWT_SECRET;

//Register
const register = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: 'User already exists, try logging in'});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.log('Register Error:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

//Login
const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        //Find user
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid Credentials'});

        //Compare passwords
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid Credentials'});
        
        //Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRETKEY,
            {expiresIn: '1d'}
        );
        res.status(200).json({token});
    } catch (error) {
        console.log('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { register,login };