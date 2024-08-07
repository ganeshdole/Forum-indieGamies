const repliesModel = require('../db/models/repliesModel')
const { createSuccess, createError } = require('../utils/utils')



 const getRepliesByThreadId = async (req, res) => {
    try {
        const threadId = req.params.threadId;
        console.log(threadId)
        const replies = await repliesModel.find({ threadId: threadId }).sort({ createdAt: -1 });
        if (!replies) {
            return res.status(404).json(createError('No replies found for this thread'));
        }

        return res.status(200).json(createSuccess(replies));
    } catch (error) {
        console.error('Error getting replies:', error);
        return res.status(500).json(createError('Error getting replies', error.message));
    }
}

const getRepliesByUserId = async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const replies = await repliesModel.find({ author: authorId });
        if (!replies) {
            return res.status(404).json(createError('No replies found for this user'));
        }

        return res.status(200).json(createSuccess(replies));
    } catch (error) {
        console.error('Error getting replies:', error);
        return res.status(500).json(createError('Error getting replies', error.message));
    }
}


const postReply = async (req, res) => {
    try{
        const { threadId, content } = req.body;
        const {username } = req.user;
        console.log(threadId, content, username)
        if(!threadId || !content){
            return res.status(400).json(createError('Thread ID and content are required'));
        }
        const reply = new repliesModel({
                                            threadId,
                                            author: username,
                                            content })

        const newReply = await reply.save();
        return res.status(201).json(createSuccess(newReply));
    }
    catch(error){
        console.error('Error posting reply:', error);
        return res.status(500).json(createError('Error posting reply', error.message));
    }
}


const deleteReply = async (req, res)  =>{
    try{
        const replyId = req.params.replyId;
        const reply = await repliesModel.findById(replyId);
        if(!reply){
            return res.status(404).json(createError('Reply not found'));
        }
        await repliesModel.findByIdAndDelete(replyId);
        return res.status(200).json(createSuccess('Reply deleted'));
    }catch(error){
        console.error('Error deleting reply:', error);
        return res.status(500).json(createError('Error deleting reply', error.message));
    }

}

module.exports = {
    getRepliesByThreadId,
    getRepliesByUserId,
    postReply, deleteReply
}