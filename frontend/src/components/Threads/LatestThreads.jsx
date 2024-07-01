import React, { useState, useEffect } from 'react';
import { Loader, Plus, RefreshCw } from 'lucide-react';
import { getAllThreads } from '../../services/threads';
import ThreadCard from './ThreadCard';
import { useNavigate } from 'react-router-dom';

const LatestThreads = () => {
    const [threads, setThreads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchThreads();
        console.log(threads)
    }, [JSON.stringify(threads)]);

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

    const handleNewThread = () => {
        navigate("/thread/new");
    };

    return (
        <section className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                        Recent Discussions
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={fetchThreads}
                            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            <span className="text-sm">Refresh</span>
                        </button>
                        <button
                            onClick={handleNewThread}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="text-sm">New Thread</span>
                        </button>

                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-indigo-600" size={48} />
                    </div>
                ) : (
                    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        {threads.length > 0 ? (
                            threads.map((thread, index) => (
                                <ThreadCard
                                    key={thread._id}
                                    thread={thread}
                                    isLast={index === threads.length - 1}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No threads found. Start a new discussion!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestThreads;