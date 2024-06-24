import React from 'react';

const CategoriesPageHero = ({ category }) => {
    const { name, description, icon } = category;

    const categoryColors = {
        'General Discussion': 'from-purple-700 to-pink-500',
        'Technical Help': 'from-green-600 to-blue-500',
        'Art and Design': 'from-yellow-500 to-red-600',
        'Marketing and Business': 'from-orange-500 to-indigo-700',
    };

    const gradientColor = categoryColors[name] || 'from-gray-700 to-gray-900';

    return (
        <div className={`bg-gradient-to-r ${gradientColor} py-24 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <div className='flex justify-center items-center gap-4 mb-6'>
                        <span className='text-3xl sm:text-6xl'>{icon}</span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white font-"
                            style={
                                { fontFamily: "Teko-Bold" }
                            }
                        >{name}</h1>
                    </div>
                    <p className="mt-4 text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto"
                    >{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPageHero;