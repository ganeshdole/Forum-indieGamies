const categoriesModel = require('../db/models/categoriesModel');
const { createSuccess, createError } = require('../utils/utils');

const getCategorie = async (req, res) => {
    try {
        const categorieId = req.params.id;
        const categorie = await categoriesModel.findById(categorieId);
        
        if (!categorie) {
            return res.status(404).json(createError('Category not found'));
        }
        
        res.status(200).json(createSuccess(categorie));
    } catch (error) {
        console.error('Error getting category by ID:', error.message);
        res.status(500).json(createError('Error getting category', error.message));
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        
        if (categories.length === 0) {
            return res.status(404).json(createError('No categories found'));
        }
        
        res.status(200).json(createSuccess(categories));
    } catch (error) {
        console.error('Error getting categories:', error.message);
        res.status(500).json(createError('Error getting categories', error.message));
    }
};

module.exports = {
    getCategories,
    getCategorie
};
