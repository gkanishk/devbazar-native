import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Products/products.slice';
import userReducer from '../features/User/user.slice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;