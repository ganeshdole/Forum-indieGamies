const express = require('express');
const router = express.Router();
const { registerUser , updateUserById, deleteUserById, signinUser} = require('../controllers/userController');

router.post('/register', registerUser);
router.post("/signin", signinUser );
router.delete("/deleteuser", deleteUserById)
router.patch("/updateuser", updateUserById)

module.exports = router;
