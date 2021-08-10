import { getAxiosClient } from "./useAxios";
import React from "react";
import {store} from "../app/store";
import { useToast } from "react-native-styled-toast";
import { useNavigation } from "@react-navigation/core";
import { setCart, setWishlist, userStateType } from "../features/User/user.slice";


export const useProductItems=({cart,wishList,isLoggined,accessToken}:userStateType)=>{
    const { toast } = useToast();
    const navigation: any = useNavigation();
    const isItemInCart=(id:string)=>{
        return cart.some(({item:{id:productId}})=>id===productId);
    }

    const isItemInWishList=(id:string)=>{
        return wishList.some(({item:{id:productId}})=>id===productId);
    }

    const getDiscounterPrice = (price:number, disc: number) => {
        return Math.round(price - ((disc / 100) * price));
    }

    const getDeliveryDate=()=> {
        const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date();
        const date = new Date(currentDate.setDate(currentDate.getDate() + (Math.floor(Math.random() * (10- 5 + 1)) + 5))).toLocaleString(undefined,options);
        return date;
    }

    const addToCartWishList = async (productId:string, type: 'addToCart' | 'addToWishList') => {
        if (!isLoggined)
            return navigation.navigate("Login",{referer: "Product"});
        try {
            const { data } = await getAxiosClient(accessToken).post(`/user/${type}`, { productId })
            if (type === "addToCart") {
                const btn =( React.createElement("a", { href: "/cart" },"Go To Cart"));
                store.dispatch(setCart(data?.response?.wishList ?? []));
                toast({
                    message: "Added to Cart",
                })
            } else {       
                store.dispatch(setWishlist(data?.response?.wishList ?? []));
                toast({
                    message: "Added to Wishlist"
                })
            }
        } catch (error){
            toast({
                message: error.response?.data?.message??"Operation failed",
                intent: "ERROR"
            });
        }
    }

    const getwishListBody=(productId:string)=>{
        const wishListBody:{productId:string}[] =[];
        wishList.forEach(({item})=>{
            if(item?.id!==productId)
            wishListBody.push({productId: item.id})
        });
        return wishListBody;
    }

    const removeFromWishList=async(productId: string,showNotification:boolean=false)=>{
        const wishListItems = wishList.filter(({item})=>item.id!==productId);
        await getAxiosClient(accessToken).post("/user/updateWishList",getwishListBody(productId));
        store.dispatch(setWishlist([...wishListItems]));
        if(showNotification) {
            toast({
                message: "Removes from Wishlist",
                intent: "INFO"
            })
        }
    }

    const moveToCart=async(productId:string)=>{
        // Remove from WishList
        await removeFromWishList(productId);
        await addToCartWishList(productId,"addToCart");
    }

    const updateItemCount = async(count:number,productId:string, index: number)=> {
        cart[index].count=count;
        store.dispatch(setCart([...cart]));
    }

    const removeFromCart = async(index:number,showNotification: boolean) =>{
        try {
            const arr= [...cart];
            arr.splice(index, 1);
            console.log(arr,index);
            store.dispatch(setCart(arr));
            const cartBody: {productId: string, count: number}[] = [];
            arr.forEach(({item,count})=>{
                cartBody.push({productId: item.id,count})
            })
            await getAxiosClient(accessToken).post("/user/updateCart",cartBody);
            if(showNotification) {
                toast({
                    message: "Item removed!"
                });
            }
        }catch (err) {
            toast({
                message: "Operation Failed",
                intent: "ERROR"
            })
        }

    }

    const moveToWishList = async(id:string,index:number)=> {
        removeFromCart(index,false);
        await addToCartWishList(id,"addToWishList");
    }

    const getPriceDetails = () =>{
        const amount = {
            mrp: 0,
            totalDiscount: 0,
            shippingCost: 0,
            finalAmount: 0,
            itemCount: 0
        }
        cart.forEach(({item,count})=>{
            amount.mrp += item.price * count;
            amount.itemCount += count;
        })
        cart.forEach(({item:{price,discount}})=>{
            amount.totalDiscount += Math.floor((price*discount)/100)
        });
        amount.finalAmount = amount.mrp - amount.totalDiscount;
        if(amount.finalAmount<500){
            amount.finalAmount += 99;
            amount.shippingCost = 99;
        }

        return amount;
    }

    const placeOrder = async() =>{
        toast({
            message: "Order placed, details will be mailed shortly."
        })
        store.dispatch(setCart([]));
        await getAxiosClient(accessToken).post("/user/updateCart",[]);
    }

    return {
        isItemInCart,
        isItemInWishList,
        getDiscounterPrice,
        addToCartWishList,
        moveToCart,
        removeFromWishList,
        getDeliveryDate,
        getPriceDetails,
        removeFromCart,
        moveToWishList,
        updateItemCount,
        placeOrder
    }
}