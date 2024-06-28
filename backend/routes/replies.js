const express = require('express');
const router = express.Router();
const { getRepliesByThreadId, postReply } = require('../controllers/repliesController');


router.get('/:threadId', getRepliesByThreadId);
router.post('/new', postReply);

module.exports = router;