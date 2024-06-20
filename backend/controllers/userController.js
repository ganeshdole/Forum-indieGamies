const userModel = require('../db/models/userModel');
const { createSuccess, createError } = require('../utils/utils');
const bcryptJs = require('bcryptjs');
const jwt  = require('jsonwebtoken')
// Register User
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcryptJs.genSalt(10);
        const encryptedPassword = await bcryptJs.hash(password, salt);

        const newUser = new userModel({
            name: {
                firstName,
                lastName
            },
            email,
            password: encryptedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(createSuccess(savedUser));
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json(createError('Error creating user', error.message));
    }
};

// Sign-in user 
const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json(createError('User not found'));
        }

        const isMatch = await bcryptJs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(createError('Invalid Password'));
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET
        );

        res.status(200).json(createSuccess({ message: 'User signed in successfully', token }));
    } catch (error) {
        console.log('Error in signing-in user', error.message);
        return res.status(500).json(createError('Error signing in user', error.message));
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json(createError('User not found'));
        }
        res.status(200).json(createSuccess(user));
    } catch (error) {
        console.error('Error getting user by id:', error.message);
        res.status(500).json(createError('Error getting user by id', error.message));
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const updateField = {};
        if (firstName) updateField['name.firstName'] = firstName;
        if (lastName) updateField['name.lastName'] = lastName;
        if (email) updateField['email'] = email;
        if (password) updateField['password'] = password;

        const updatedUser = await userModel.findByIdAndUpdate(id, updateField, { new: true });
        if (!updatedUser) {
            return res.status(404).json(createError('User not found'));
        }

        return res.status(200).json(createSuccess(updatedUser));
    } catch (error) {
        console.log('Error updating user', error.message);
        return res.status(500).json(createError('Error updating user', error.message));
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json(createError('User does not exist'));
        }
        res.status(200).json(createSuccess('User deleted successfully'));
    } catch (error) {
        console.log('Error deleting user:', error.message);
        res.status(500).json(createError('Error deleting user', error.message));
    }
};

module.exports = { registerUser, signupUser, getUserById, updateUserById, deleteUserById };
