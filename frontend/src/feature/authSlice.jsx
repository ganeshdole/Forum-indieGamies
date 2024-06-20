import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = '';
        }
    }
});

export const { addToken, removeToken } = authSlice.actions;

export default authSlice.reducer;