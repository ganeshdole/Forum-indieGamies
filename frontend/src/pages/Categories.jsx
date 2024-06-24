import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../services/categoris";
import CategoriesPageHero from "../components/Categories/CategoriesPageHero";
import CategoriesThread from "../components/Categories/CategoriesThread";

const Categories = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

        fetchCategorie();
    }, [categoryId]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <section className="min-h-screen bg-gray-900">
            <CategoriesPageHero category={category} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <CategoriesThread categoryId={categoryId} />
            </div>
        </section>
    );
};

export default Categories;