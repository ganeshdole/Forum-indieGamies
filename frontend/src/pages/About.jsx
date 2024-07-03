import React from 'react';
import indieGamies from "../assets/images/indieGamies.png";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
                <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-center">
                    About Us
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Welcome to IndieGamie! We are a passionate group of indie game developers and enthusiasts dedicated to bringing unique and innovative gaming experiences to life. Our community is built around creativity, collaboration, and the love for indie games. Whether you're a developer, player, or simply a fan of the indie game scene, IndieGamie is the place for you.
                </p>
                <div className="flex justify-center mt-8">
                    <img
                        src={indieGamies}
                        style={{ width: "400px" }}
                        alt="IndieGamie"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Our mission is to support and showcase the incredible work of indie game developers from around the world. We believe that the best games come from the heart, and we are committed to providing a platform where developers can share their creations and connect with an audience that appreciates their craft.
                </p>
            </div>
        </div>
    );
}

export default About;
