const express = require('express');
const router = express.Router();
//getReplies, getReplyById, , updateReply, deleteReply
const { getRepliesByThreadId } = require('../controllers/repliesController');


router.get('/:threadId', getRepliesByThreadId);

module.exports = router;