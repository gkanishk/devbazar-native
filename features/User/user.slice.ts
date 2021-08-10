
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {useSecureStorage} from "../../hooks/useSecureStorage";

const initialState = {
    isLoggined: false,
    accessToken: "",
    cart: [],
    wishList: [],
    userDetails: {
        name: "",
        email: ""
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggined = true;
            state.accessToken = action.payload.token;
            state.userDetails = action.payload.userDetails;
            useSecureStorage.setStorage("accessToken",action.payload.token);
            useSecureStorage.setStorage("userDetails",JSON.stringify(action.payload.userDetails));
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setWishlist: (state, action) => {
            state.wishList = action.payload;
        }
    }
})

export const {
    setCart,
    setLogin,
    setWishlist
} = userSlice.actions;

export const getUserLoginned = (state: RootState) => state.user.isLoggined;
export const getCart = (state: RootState) => state.user.cart;
export const wishList = (state: RootState) => state.user.wishList;
export const getUserDetails = (state: RootState) => state.user.userDetails;
export const getAccessToken = (state: RootState) => state.user.accessToken;

export default userSlice.reducer;