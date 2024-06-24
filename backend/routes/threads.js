const express = require('express');
const router = express.Router();
const {getLatestThread , getThreadsByCategory, getThreadById} = require('../controllers/threadsController');


router.get('/', getLatestThread);
router.get("/:categoryId", getThreadsByCategory)
router.get("/thread/:threadId", getThreadById)

module.exports = router;    