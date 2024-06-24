const express = require('express');
const router = express.Router();
const {getLatestThread} = require('../controllers/threadsController');
const { model } = require('mongoose');

router.get('/', getLatestThread);

module.exports = router;    