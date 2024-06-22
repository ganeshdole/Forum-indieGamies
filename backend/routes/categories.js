const express = require('express');

const router = express.Router();

const {  getCategories } = require('../controllers/categoriesController');

router.get('/', getCategories);


module.exports = router;