const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../models/userModel');
const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    const user=await User.create({
        name,
        email,
        password:hashPassword
    });
    res.status(200).json({ message: "User registered successfully" });
});

const loginUser= asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    if(!await bcrypt.compare(password,user.password)){
        res.status(400);
        throw new Error("Invalid password");
    }
    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    if(!secret){
        res.status(500);
        throw new Error('JWT secret not configured');
    }
    const accessToken = jwt.sign(
        { user: { id: user._id.toString(), email: user.email, name: user.name } },
        secret,
        { expiresIn: '1h' }
    );
    res.status(200).json({ accessToken });
});

const currentUser= asyncHandler(async (req, res) => {
    if(!req.user || !req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }
    const user=await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
});

module.exports = { registerUser,loginUser,currentUser };