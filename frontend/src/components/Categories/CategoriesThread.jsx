import React, { useEffect, useState } from 'react';
import { getThreadsBYCategory } from '../../services/threads';
import ThreadCard from "../Threads/ThreadCard";

const CategoriesThread = ({ categoryId }) => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const result = await getThreadsBYCategory(categoryId);
                setThreads(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();
    }, [categoryId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-white text-xl">Loading threads...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error.message}</span>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {threads.length === 0 ? (
                <p className="text-gray-400 text-lg">No threads found in this category.</p>
            ) : (
                threads.map((thread, index) => (
                    <ThreadCard
                        key={thread._id}
                        thread={thread}
                        isLast={index === threads.length - 1}
                    />
                ))
            )}
        </div>
    );
};

export default CategoriesThread;