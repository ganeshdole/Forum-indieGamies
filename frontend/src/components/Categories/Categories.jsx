import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../services/categoris';
import { Loader } from 'lucide-react';

const Categories = () => {
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
                <Loader className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    return (
        <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-inter font-bold text-gray-900 mb-12 text-center">
                    Explore Our Forums
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex"
                        >
                            <div className="bg-blue-600 p-6 flex items-center justify-center">
                                <span className="text-4xl" role="img" aria-label={category.name}>
                                    {category.icon}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-xl font-inter font-semibold text-gray-900 mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 font-inter">
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <a
                                        href={`/category/${category._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-inter font-semibold transition-colors duration-300"
                                    >
                                        Join Discussion →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;