const express = require('express');
const router = express.Router();
const {getLatestThread , getThreadsByCategory, getThreadById , postNewThread } = require('../controllers/threadsController');


router.get('/', getLatestThread);
router.get("/:categoryId", getThreadsByCategory)
router.get("/thread/:threadId", getThreadById)
router.post("/thread/new", postNewThread)

module.exports = router;    