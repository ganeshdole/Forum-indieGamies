import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCategorie } from "../services/categoris"
const Categories = () => {
    const { categoryId } = useParams()

    function fetchCategorie(id) {
        getCategorie(id)
    }

    useEffect(() => {
        fetchCategorie(categoryId)
    }, [])
    return (
        <div>
            Hello From category({categoryId})
        </div>
    )
}

export default Categories;