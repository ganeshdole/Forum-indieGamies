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
        console.error('Error getting threads:', error);
        return res.status(500).json({ message: 'Error getting threads', error: error.message });
    }
};


const postNewThread = async (req, res) =>{
    try {
        const { title, description, categoryId} = req.body;
        const author = req.user.username;
        if (!title || !description || !categoryId) {
            return res.status(400).json({ message: 'Title, content, and category are required' });
        }

        const newThread = new threadsModel({
            title,
            description,
            category: categoryId,
            author,
            replies : 0,
            views : 0,
        });
        const thread = await newThread.save();
        return res.status(200).json(createSuccess(thread));
        }catch(error){
            console.error('Error creating thread:', error.message);
            return res.status(500).json({ message: 'Error creating thread', error: error.message });
        }
}

module.exports = {
    getLatestThread, getThreadsByCategory,getThreadById, postNewThread
}