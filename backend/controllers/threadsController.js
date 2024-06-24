const threadsModel = require('../db/models/threadsModel')
const { createSuccess, createError } = require('../utils/utils')


const getLatestThread = async (req, res) => {
    try {
        const threads = await threadsModel.find();
        if(threads.length === 0){
            res.status(500).json(createError('Error getting threads', error.message));
        }
        res.status(200).json(createSuccess(threads));
    } catch (error) {
        console.error('Error getting threads:', error.message);
        res.status(500).json(createError('Error getting threads', error.message));
    }
}
module.exports = {
    getLatestThread
}