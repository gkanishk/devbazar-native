import { Text, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { useSecureStorage } from "../hooks/useSecureStorage";
import { useToast } from "react-native-styled-toast";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUserDetails, getUserLoginned, resetUser } from "../features/User/user.slice";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const isUserLoggined = useAppSelector(getUserLoginned);
    const userDetails = useAppSelector(getUserDetails);
    const navigation = useNavigation();
    const logoutUser = async () => {
        await useSecureStorage.deleteItemFromStorage("accessToken");
        await useSecureStorage.deleteItemFromStorage("userDetails");
        toast({
            message: "Logout Successful"
        });
        dispatch(resetUser());
    }
    return (
        <>
            <SafeAreaView style={{ display: "flex", flex: 1, padding: 30}}>
                <Text style={tw`font-bold text-3xl mb-6 text-center`}>
                    Profile
                </Text>
                <Text style={tw`font-bold text-xl mb-2 mt-8 text-center`}>
                    Welcome {userDetails.name}!
                </Text>
                <Text style={tw`mb-2 text-center`}>
                    {userDetails.email}
                </Text>
                {
                    !isUserLoggined &&
                    <Text style={tw`mb-2 text-center`}>
                        In order to access you need to login.
                    </Text>
                }
                <Button 
                title="Cart"
                type="outline"
                buttonStyle={tw`p-0 m-2 mt-8 py-1`}
                onPress={()=>navigation.navigate("Cart")}
                />
                <Button 
                title="WishList"
                type="outline"
                buttonStyle={tw`p-0 m-2 py-1`}
                onPress={()=>navigation.navigate("WishList")}
                />
                {
                    isUserLoggined ?
                    <Button
                        title="Logout"
                        onPress={logoutUser}
                        buttonStyle={tw`p-0 m-2 py-1`}
                    />
                    :
                    <Button
                        title="Login"
                        onPress={()=>navigation.navigate("Login")}
                        buttonStyle={tw`p-0 m-2 py-1`}
                    />
                }
            </SafeAreaView>
        </>
    )
}