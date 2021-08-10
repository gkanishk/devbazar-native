import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useAppSelector } from "../app/hook";
import LoginUser from "../components/LoginUser";
import { getUserLoginned } from "../features/User/user.slice";

export default function LoginScreen() {
    const isUserLoginned = useAppSelector(getUserLoginned);
    const navigation = useNavigation();
    useEffect(()=>{
        // @ts-ignore
        isUserLoginned && navigation.navigate("Product"); 
    },[])

    return (
        <SafeAreaView style={{display: "flex",flex:1, justifyContent: "center", alignItems: 'center', backgroundColor: "#FEF1F2"}}>
            <LoginUser />
        </SafeAreaView>
    )
}