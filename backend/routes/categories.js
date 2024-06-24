const express = require('express');

const router = express.Router();

const {  getCategories, getCategorie } = require('../controllers/categoriesController');

router.get('/', getCategories);
router.get('/:id', getCategorie);

module.exports = router;