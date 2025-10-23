const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User registered successfully" });
});

const loginUser= asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User logged in successfully" });
});

const currentUser= asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current user info" });
});

module.exports = { registerUser,loginUser,currentUser };