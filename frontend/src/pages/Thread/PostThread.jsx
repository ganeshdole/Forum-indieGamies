import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';
import { createThread } from '../../services/threads';
import { useSelector } from 'react-redux';


const categories = [
    {
        _id: '66752c0862d5484eb3093f99',
        name: 'General Discussion',
        icon: '💬'
    },
    {
        _id: '66752c0862d5484eb3093f9a',
        name: 'Technical Help',
        icon: '🛠️'
    },
    {
        _id: '66752c0862d5484eb3093f9b',
        name: 'Art and Design',
        icon: '🎨'
    },
    {
        _id: '66752c0862d5484eb3093f9c',
        name: 'Marketing and Business',
        icon: '📊'
    }
];

function PostThread() {
    const token = useSelector((state) => state.authentication.token);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            const timer = setTimeout(() => {
                navigate('/login', { state: { from: '/post-thread' } });
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const threadData = {
            title,
            description: content,
            categoryId: selectedCategory
        };

        try {
            setIsLoading(true);
            const result = await createThread(threadData, token);
            if (result.status === 'success') {
                alert('Thread created successfully');
                navigate(-1);
            } else {
                throw new Error('Failed to create thread');
            }
        } catch (error) {
            console.error('Error creating thread:', error);
            alert('Failed to create thread. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-white text-xl">
                    {!token ? "You're not logged in. Redirecting to login page..." : "Loading..."}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Create New Thread
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                            Select Category
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Thread Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                            Thread Content
                        </label>
                        <textarea
                            id="content"
                            rows="6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            <Send className="h-5 w-5 mr-2" />
                            Post Thread
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostThread;