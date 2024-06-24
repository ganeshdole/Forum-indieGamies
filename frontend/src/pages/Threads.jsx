import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadById } from "../services/threads";
import { getCategoryById } from "../services/categoris";

const Threads = () => {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(thread)
    useEffect(() => {
        const fetchThreadAndCategory = async () => {
            try {
                setLoading(true);
                const threadResult = await getThreadById(threadId);
                setThread(threadResult);

                if (threadResult && threadResult.category) {
                    const categoryResult = await getCategoryById(threadResult.category);
                    setCategory(categoryResult.data);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchThreadAndCategory();
    }, [threadId]);

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
                        <h1 className="text-3xl sm:text-4xl font-bold">{thread.title}</h1>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <span>Posted by {thread.author}</span>
                        <span className="mx-2">•</span>
                        <span>{thread.views} views</span>
                        <span className="mx-2">•</span>
                        <span>{thread.replies} replies</span>
                    </div>
                </div>
            </div>

            {/* Thread Content */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Original post content would go here */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-lg">
                        {thread.description}
                    </p>
                </div>

                {/* Replies */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Replies</h2>
                    {/* Map through replies here when you have them */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-400 mb-4">
                            This is a placeholder for replies. You would typically map through
                            the replies array and render each reply here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Threads;