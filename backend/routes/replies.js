const express = require('express');
const router = express.Router();
const { getRepliesByThreadId, postReply, deleteReply } = require('../controllers/repliesController');


router.get('/:threadId', getRepliesByThreadId);
router.post('/new', postReply);
router.delete('/:replyId', deleteReply);

module.exports = router;