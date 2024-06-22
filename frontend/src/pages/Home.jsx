import React from 'react';
import Categories from '../components/Categories/Categories';
import { MessageSquare } from 'lucide-react';
import ThreadsList from '../components/Threads/threads';

const Home = () => {
    return (
        <>
            <section className="bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex flex-col justify-center items-center p-8">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-3xl w-full transform hover:scale-105 transition-all duration-300">
                    <h1 className="font-inter text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-6">
                        IndieGamie Forum
                    </h1>
                    <p className="font-inter text-2xl text-gray-600 text-center mb-10">
                        Connect, discuss, and level up your gaming experience
                    </p>
                    <div className="flex justify-center mb-10">
                        <MessageSquare className="text-indigo-600" size={64} />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-inter font-semibold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            Start a Discussion
                        </button>
                        <button className="bg-white text-indigo-600 font-inter font-semibold py-4 px-8 rounded-full border-2 border-indigo-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-indigo-50">
                            Explore Topics
                        </button>
                    </div>
                </div>
            </section>
            <Categories />
            <ThreadsList />
        </>
    );
};

export default Home;