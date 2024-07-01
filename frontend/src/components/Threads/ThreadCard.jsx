import React from 'react';
import { MessageSquare, Eye } from 'lucide-react';

const ThreadCard = ({ thread, isLast }) => {
    return (
        <div className={`p-6 transition duration-300 ease-in-out hover:bg-gray-700 ${!isLast && 'border-b border-gray-700'}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-semibold text-indigo-400 transition duration-300 ease-in-out hover:text-purple-400">
                    <a href={`/thread/${thread._id}`}>
                        {thread.title.slice(0, 90) + (thread.title.length > 90 ? "...." : "")}
                    </a>
                </h3>
                <span className="text-sm text-gray-400">by {thread.author}</span>
            </div>
            <p className="text-base text-gray-400 mb-4">
                {thread.description.slice(0, 120) + (thread.description.length > 100 ? "...." : "")}
            </p>

            <div className="flex items-center text-sm text-gray-400">
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
}

export default ThreadCard;