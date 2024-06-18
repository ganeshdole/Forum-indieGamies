const express = require('express');
const router = express.Router();
const userModel = require('../db/models/User');

router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
