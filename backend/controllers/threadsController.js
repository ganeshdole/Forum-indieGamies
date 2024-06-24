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
const getThreadById = async(req, res) =>{
    try{
        const threadId = req.params.threadId
        if (!threadId) {
            return res.status(400).json({ message: 'Thread ID is required' });
        }

        const thread = await threadsModel.findById(threadId);
        console.log(thread)
        if (!thread) {
            return res.status(404).json({ message: 'No thread found' });
        }
        return res.status(200).json(thread);
    }catch(error){
        console.error('Error getting threads:', error);
        return res.status(500).json({ message: 'Error getting threads', error: error.message });
    }
}

const getThreadsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        
        // Validate categoryId
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const threads = await threadsModel.find({ category: categoryId });
        console.log(threads)
        // Check if threads are found
        if (!threads) {
            return res.status(404).json({ message: 'No threads found for this category' });
        }

        // Send the threads in the response
        return res.status(200).json(threads);
    } catch (error) {
        // Log the error and send a 500 response
        console.error('Error getting threads:', error);
        return res.status(500).json({ message: 'Error getting threads', error: error.message });
    }
};

module.exports = {
    getLatestThread, getThreadsByCategory,getThreadById
}