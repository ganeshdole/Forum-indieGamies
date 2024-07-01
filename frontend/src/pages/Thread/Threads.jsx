import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getThreadById, increaseThreadView } from "../../services/threads";
import { getCategoryById } from "../../services/categories";
import { getRepliesByThreadId, createReply } from "../../services/replies";

const Threads = () => {
    const token = useSelector(state => state.authentication.token);
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [replies, setReplies] = useState([]);
    const [repliesCount, setRepliesCount] = useState(0);
    const [error, setError] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [viewCounted, setViewCounted] = useState(false);

    const fetchThreadData = useCallback(async () => {
        try {
            setLoading(true);
            const threadResult = await getThreadById(threadId);
            setThread(threadResult);
            if (threadResult && threadResult.category) {
                const categoryResult = await getCategoryById(threadResult.category);
                setCategory(categoryResult.data);
            }
            const repliesResult = await getRepliesByThreadId(threadId);
            setReplies(repliesResult.data);
            setRepliesCount(repliesResult.data.length);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [threadId]);

    useEffect(() => {
        fetchThreadData();
    }, [fetchThreadData]);

    const increaseView = useCallback(async () => {
        if (!thread || viewCounted) return;

        try {
            const views = thread.views + 1;
            const updatedThread = await increaseThreadView(threadId, views);
            setThread(prevThread => ({ ...prevThread, views: updatedThread.views }));
            setViewCounted(true);
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    }, [thread, threadId, viewCounted]);

    useEffect(() => {
        increaseView();
    }, [increaseView]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const reply = {
                threadId,
                content: replyContent
            };
            const newReply = await createReply(reply, token);
            if (newReply.status === "success") {
                setReplies(prevReplies => [...prevReplies, newReply.data]);
                setRepliesCount(prevCount => prevCount + 1);
                setReplyContent("");
                setShowReplyForm(false);
            }
        } catch (err) {
            setError("Failed to submit reply: " + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-xl">Loading thread...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    if (!thread) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-xl">Thread not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Thread Header */}
            <div className="bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4">
                        {category && (
                            <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-2">
                                {category.name}
                            </span>
                        )}
                        <h1 className="text-xl sm:text-2xl font-bold">{thread.title}</h1>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <span>Posted by {thread.author}</span>
                        <span className="mx-2">•</span>
                        <span>{thread.views} views</span>
                        <span className="mx-2">•</span>
                        <span>{repliesCount} replies</span>
                    </div>
                </div>
            </div>

            {/* Thread Content */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-lg">
                        {thread.description}
                    </p>
                </div>

                {/* Reply Button */}
                <div className="mb-8">
                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {showReplyForm ? "Cancel Reply" : "Reply to Thread"}
                    </button>
                </div>

                {/* Reply Form */}
                {showReplyForm && (
                    <form onSubmit={handleReplySubmit} className="mb-8">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply here..."
                            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                            rows="4"
                        />
                        <button
                            type="submit"
                            className={`bg-green-500 text-white font-bold py-2 px-4 rounded ${token ? "cursor-pointer hover:bg-green-600" : "opacity-75 cursor-not-allowed"}`}
                            disabled={!token}
                            aria-disabled={!token}
                        >
                            Submit Reply
                        </button>
                    </form>
                )}

                {/* Replies */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Replies:</h2>
                    {replies.length > 0 ? (
                        replies.map(reply => (
                            <div key={reply._id} className="bg-gray-800 rounded-lg p-6">
                                <p className="text-gray-400 mb-4">{reply.content}</p>
                                <div className="text-sm text-gray-500">
                                    <span>Upvotes: {reply.upvotes}</span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(reply.timestamp).toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <p className="text-gray-400 mb-4">
                                There are no replies yet. Be the first to reply!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Threads;