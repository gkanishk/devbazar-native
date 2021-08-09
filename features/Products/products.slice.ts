
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store"

type ProductStateType = {
    products: {
        id: string,
        name: string,
        category: string,
        price: number, 
        discount: number, 
        quantity: number, 
        attributes: any
    }[],
    isLoading: Boolean,
    filteredProducts: {
        id: string,
        name: string,
        category: string,
        price: number, 
        discount: number, 
        quantity: number, 
        attributes: any
    }[],
    filters: {
        sortBy: string,
        discount: number[],
        size: string[],
        brand: string[],
        idealFor: string[],
        includeOutOfStock: boolean
    }
};

const initialState:ProductStateType = {
    products: [],
    isLoading: true,
    filteredProducts: [],
    filters: {
        sortBy: "",
        discount: [],
        size: [],
        brand: [],
        idealFor: [],
        includeOutOfStock: false
    }
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state,action)=>{
            state.products=action.payload;
            state.filteredProducts=action.payload;
            state.isLoading = false;
        },
        setSortByFilter: (state,action)=>{
            state.filters.sortBy = action.payload;
        },
        setDiscountFilter: (state,action:{type: string,payload:number})=>{
            const index = state.filters.discount.indexOf(action.payload);
            if(index>=0) {
                state.filters.discount.splice(index,1)
            }else {
                state.filters.discount.push(action.payload)
            }
        },
        setSizeFilter: (state,action:{type: string,payload:string})=>{
            const index = state.filters.size.indexOf(action.payload);
            if(index>=0) {
                state.filters.size.splice(index,1)
            }else {
                state.filters.size.push(action.payload)
            }
        },
        setBrandFilter: (state,action:{type: string,payload:string})=>{
            const index = state.filters.brand.indexOf(action.payload);
            if(index>=0) {
                state.filters.brand.splice(index,1)
            }else {
                state.filters.brand.push(action.payload)
            }
        },
        setIdealForFilter: (state,action:{type: string,payload:string})=>{
            const index = state.filters.idealFor.indexOf(action.payload);
            if(index>=0) {
                state.filters.idealFor.splice(index,1)
            }else {
                state.filters.idealFor.push(action.payload)
            }
        },
        setIncludeOutOfStock: (state)=>{
            state.filters.includeOutOfStock = ! state.filters.includeOutOfStock;
        },
        clearFilter: (state)=>{
            state.filters = {
                ...state.filters,
                discount: [],
                size: [],
                brand: [],
                idealFor: []
            }
        },
        clearSortByFilter: (state)=>{
            state.filters = {
                ...state.filters,
                includeOutOfStock: false,
                sortBy: ""
            }
        },
        filterProducts: (state)=>{
            let tempArray=[...state.products];
            if(state.filters.brand.length>0)
            tempArray=tempArray.filter(({attributes})=>(state.filters.brand.includes(attributes.brand)))
            if(state.filters.idealFor.length>0)
            tempArray=tempArray.filter(({attributes})=>(state.filters.idealFor.includes(attributes.for)));
            if(state.filters.size.length>0)
            tempArray=tempArray.filter(({attributes})=>((state.filters.size.filter(element => attributes.sizesAvailable.includes(element))).length>0));
            if(state.filters.discount.length>0)
            tempArray = tempArray.filter(({discount})=>(state.filters.discount.includes(discount)));
            if(state.filters.sortBy==="low"){
                tempArray=tempArray.sort((a, b) => a.price - b.price);
            }else if(state.filters.sortBy==="high") {
                tempArray=tempArray.sort((a, b) => b.price-a.price);
            }
            if(!state.filters.includeOutOfStock)
            tempArray = tempArray.filter(({quantity})=>quantity>0)
            state.filteredProducts = tempArray;
        }
    }
})

export const {
    setProducts,
    setBrandFilter,
    setDiscountFilter,
    setIdealForFilter,
    setSizeFilter,
    setSortByFilter,
    setIncludeOutOfStock,
    clearFilter,
    clearSortByFilter,
    filterProducts
} = productSlice.actions;

export const getProducts = (state:RootState) => state.products.products;
export const getFilteredProduct = (state:RootState) => state.products.filteredProducts;
export const getFilters = (state:RootState) => state.products.filters;

export default productSlice.reducer;