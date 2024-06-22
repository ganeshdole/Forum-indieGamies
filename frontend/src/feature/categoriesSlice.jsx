import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: []
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    }
});

export const { addCategories, removeCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;