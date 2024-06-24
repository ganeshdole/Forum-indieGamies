import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { getAllThreads } from '../../services/threads';
import ThreadCard from './ThreadCard';

const LatestThreads = () => {
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
                <Loader className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    return (
        <section className="bg-gray-900 py-16 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-white mb-8">Recent Discussions</h2>
                <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    {threads.map((thread, index) => (
                        <ThreadCard key={thread._id} thread={thread} isLast={index === threads.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};



export default LatestThreads;
