const userModel = require('../db/models/userModel');
const { createSuccess, createError } = require('../utils/utils');



const bcryptJs = require('bcryptjs');


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
        const { id } = req.user;
        const { firstName, lastName, email, password } = req.body;

        const updateField = {};
        if (firstName) updateField['name.firstName'] = firstName;
        if (lastName) updateField['name.lastName'] = lastName;
        if (email) updateField['email'] = email;
        if (password) {
            const salt = await bcryptJs.genSalt(10)
            const encryptedPassword  =  await bcryptJs.hash(password , salt)
            updateField['password'] = encryptedPassword;  
        }
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
        const { id } = req.user;
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

module.exports = { getUserById, updateUserById, deleteUserById };
