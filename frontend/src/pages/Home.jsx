import React from 'react';
import CategoriesList from '../components/Categories/CategoriesList';
import ThreadsList from '../components/Threads/LatestThreads';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="bg-gradient-to-br from-indigo-800 to-purple-900 flex flex-col justify-center items-center p-8 min-h-[350px]">
                <div className="max-w-3xl w-full text-center">
                    <h1 className="font-teko text-5xl font-extrabold text-white uppercase" style={
                        { fontFamily: "Teko-Bold" }
                    }>
                        Welcome to Forum
                    </h1>
                    <p className="font-teko text-xl text-white mb-10 uppercase" style={
                        { fontFamily: "Teko-Medium" }
                    }>
                        Connect, discuss, and level up your gaming experience
                    </p>
                    <div className="space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-inter font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={() => {
                            navigate("/register")
                        }}>
                            Join the Discussion
                        </button>
                        {/* <button className="bg-white hover:bg-gray-100 text-blue-600 font-inter font-semibold py-3 px-6 rounded-lg shadow-md border border-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            onClick={() => {
                                navigate("#categories")
                            }}
                        >
                            Browse Topics
                        </button> */}
                    </div>
                </div>
            </section>
            <CategoriesList />
            <ThreadsList />
        </>
    );
};

export default Home;
