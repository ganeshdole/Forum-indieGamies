const repliesModel = require('../db/models/repliesModel')
const { createSuccess, createError } = require('../utils/utils')



 const getRepliesByThreadId = async (req, res) => {
    try {
        const threadId = req.params.threadId;
        console.log(threadId)
        const replies = await repliesModel.find({ threadId: threadId });
        console.log(replies)
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
        console.log(authorId)
        const replies = await repliesModel.find({ author: authorId });
        console.log(replies)
        if (!replies) {
            return res.status(404).json(createError('No replies found for this user'));
        }

        return res.status(200).json(createSuccess(replies));
    } catch (error) {
        console.error('Error getting replies:', error);
        return res.status(500).json(createError('Error getting replies', error.message));
    }
}

module.exports = {
    getRepliesByThreadId,
    getRepliesByUserId
}