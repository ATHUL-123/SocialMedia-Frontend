import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage
const admin = JSON.parse(localStorage.getItem('admin'));

const initialState = {
    admin: admin ? admin : null,
    usersList:[]
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => {
            state.admin = null; // Correct assignment syntax
            localStorage.removeItem('admin'); // Remove from localStorage
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
            localStorage.setItem('admin', JSON.stringify(action.payload)); // Update localStorage
        },
        setUserList:(state,action)=>{
            state.usersList= action.payload;
        }
    },
});

export const { reset, setAdmin, setUserList } = adminSlice.actions;
export default adminSlice.reducer;
