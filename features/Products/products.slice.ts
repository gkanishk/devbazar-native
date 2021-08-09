
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store"

const initialState = {
    products: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state,action)=>{
            state.products=action.payload;
        }
    }
})

export const {
    setProducts
} = productSlice.actions;

export const getProducts = (state:RootState) => state.products.products;

export default productSlice.reducer;