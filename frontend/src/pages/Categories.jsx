import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategorie } from "../services/categoris"
import CategoriesPageHero from "../components/Categories/CategoriesPageHero";
import CategoriesThread from "../components/Categories/CategoriesThread";

const Categories = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({})

    async function fetchCategorie(id) {
        const category = await getCategorie(id)
        if (category.status === "success") {
            setCategory(category.data)
        }
    }

    useEffect(() => {
        fetchCategorie(categoryId)
    }, [])
    console.log(category)

    return (
        <div>
            <CategoriesPageHero category={category} />
            <CategoriesThread categoryId={category._id} />
        </div>
    )
}

export default Categories;