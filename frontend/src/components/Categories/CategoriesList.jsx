import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../services/categories';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setIsLoading(true);
        try {
            const response = await getAllCategories();
            if (response.status === 'success') {
                setCategories(response.data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
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
        <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-inter font-bold text-white mb-6 font-sans">
                    Explore Our Forums
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <Link to={`/category/${category._id}`}>
                            <div
                                key={category._id}
                                className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex"
                            >
                                <div className="bg-indigo-500 p-6 flex items-center justify-center">
                                    <span className="text-4xl text-white" role="img" aria-label={category.name}>
                                        {category.icon}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="text-xl font-inter font-semibold text-white mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <span
                                            className="text-indigo-400 hover:text-indigo-600 font-semibold transition-colors duration-300"
                                        >
                                            Join Discussion →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesList;