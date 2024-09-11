import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    items: JSON.parse(sessionStorage.getItem('cartItems')) || {},
    totalItems: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add item, remove item and checkout are actions
        addItem: (state, action) => { 
            const { id } = action.payload;
            if (state.items[id]) {
                state.items[id] += 1;
            } else {
                state.items[id] = 1;
            }
            state.totalItems += 1;
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            if (state.items[id]) {
                state.items[id] -=1;
                if(state.items[id] === 0) {
                    delete state.items[id];
                }
                state.totalItems -=1;
            }
        },
        checkout:  (state) => {
            state.items = {};
            state.totalItems =0;
        },
    },       
});
export const { addItem, removeItem, checkout} = cartSlice.actions;

export default cartSlice.reducer;