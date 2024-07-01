import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById } from "../services/categories";
import CategoriesPageHero from "../components/Categories/CategoriesPageHero";
import CategoriesThread from "../components/Categories/CategoriesThread";
import { Plus, RefreshCw } from 'lucide-react';

const Categories = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategorie = async () => {
        try {
            const result = await getCategoryById(categoryId);
            if (result.status === "success") {
                setCategory(result.data);
            }
        } catch (error) {
            console.error("Error fetching category:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorie();
    }, [categoryId]);

    const handleNewThread = () => {
        // Navigate to the new thread creation page
        navigate('/thread/new');
    };

    const handleRefresh = () => {
        // Refresh the category data
        setIsLoading(true);
        fetchCategorie();
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading...</div>;
    }

    return (
        <section className="min-h-screen bg-gray-900 text-white" id="categories">
            <CategoriesPageHero category={category} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
                    <h2 className="text-3xl font-bold">Recent Discussions</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleRefresh}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </button>
                        <button
                            onClick={handleNewThread}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out">
                            <Plus className="w-4 h-4 mr-2" />
                            New Thread
                        </button>
                    </div>
                </div>
                <CategoriesThread categoryId={categoryId} />
            </div>
        </section>
    );
};

export default Categories;
