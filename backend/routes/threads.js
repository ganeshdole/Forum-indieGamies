const express = require('express');
const router = express.Router();
const {getThreads} = require('../controllers/threadsController');
const { model } = require('mongoose');

router.get('/', getThreads);

module.exports = router;    