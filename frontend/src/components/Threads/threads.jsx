import React, { useState, useEffect } from 'react';
import { MessageSquare, Eye, Loader } from 'lucide-react';
import { getAllThreads } from '../../services/threads';

const ThreadsList = () => {
    const [threads, setThreads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchThreads();
    }, []);

    async function fetchThreads() {
        setIsLoading(true);
        try {
            const response = await getAllThreads();
            if (response.status === 'success') {
                setThreads(response.data);
            } else {
                console.error('Failed to fetch threads');
            }
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <section className="bg-gray-100 py-16 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Recent Discussions</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {threads.map((thread, index) => (
                        <ThreadCard key={thread._id} thread={thread} isLast={index === threads.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ThreadCard = ({ thread, isLast }) => (
    <div className={`p-6 transition duration-300 ease-in-out hover:bg-gray-50 ${!isLast && 'border-b border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold text-blue-500 transition duration-300 ease-in-out hover:text-purple-500">
                <a href={`/thread/${thread._id}`}>{thread.title}</a>
            </h3>
            <span className="text-sm text-gray-600">by {thread.author}</span>
        </div>
        <p className="text-base text-gray-600 mb-4">{thread.description}</p>
        <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-6">
                <MessageSquare size={16} className="mr-2" />
                <span>{thread.replies} replies</span>
            </div>
            <div className="flex items-center">
                <Eye size={16} className="mr-2" />
                <span>{thread.views} views</span>
            </div>
        </div>
    </div>
);

export default ThreadsList;