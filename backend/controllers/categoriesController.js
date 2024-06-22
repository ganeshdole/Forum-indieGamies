const categoriesModel = require('../db/models/categoriesModel');
const { createSuccess, createError } = require('../utils/utils');

const getCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        console.log('Categories:', categories);
        res.status(200).json(createSuccess(categories));
    } catch (error) {
        console.error('Error getting categories:', error.message);
        res.status(500).json(createError('Error getting categories', error.message));
    }
}

module.exports = {
    getCategories
}