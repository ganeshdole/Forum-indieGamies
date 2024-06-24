import React from 'react';

const CategoriesPageHero = (props) => {
    const { name, description, icon } = props.category;

    const categoryColors = {
        'General Discussion': 'from-purple-700 to-pink-500',
        'Technical Help': 'from-green-600 to-blue-500',
        'Art and Design': 'from-yellow-500 to-red-600',
        'Marketing and Business': 'from-orange-500 to-indigo-700',
    };


    const gradientColor = categoryColors[name];
    return (
        <div className={`bg-gradient-to-r ${gradientColor} py-20 px-4 sm:px-6 lg:px-8`} >
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <div className='flex justify-center items-center gap-4'>
                        <span className='text-4xl'>{icon}</span>
                        <h1 className="text-4xl font-semibold text-white">{name}</h1>
                    </div>
                    <p className="mt-4 text-lg text-white">{description}</p>
                </div>
            </div>
        </div >
    );
};

export default CategoriesPageHero;
