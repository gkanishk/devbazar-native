import { Text, View, Image } from "react-native";
import React from "react";
import { useAppSelector } from "../app/hook";
import { getUserLoginned } from "../features/User/user.slice";
import tw from "tailwind-react-native-classnames";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import UserWishList from "../components/UserWishList";
const LoginIcon = require("../assets/login.png");
export default function WishListScreen() {
    const isUserLoginned = useAppSelector(getUserLoginned);
    const navigation = useNavigation();
    return (
        <>
            {
                isUserLoginned ?
                    <View style={tw`flex flex-1 p-2`}>
                        <UserWishList />
                    </View> :
                    <View style={tw`flex items-center flex-1 justify-center`}>
                        <Text style={tw`text-lg font-bold`}>
                            PLEASE LOGIN
                        </Text>
                        <Text>
                            TO VIEW ITEMS IN WISHLIST
                        </Text>
                        <Image
                            source={LoginIcon}
                            style={{
                                width: 300,
                                height: 200,
                                margin: 15
                            }}
                            resizeMode="contain"
                        />
                        <Button
                            title="Login"
                            type="outline"
                            containerStyle={tw`mt-4`}
                            buttonStyle={tw`px-6 py-1`}
                            // @ts-ignore
                            onPress={() => navigation.navigate("Login", { referer: "WishList" })}
                        />
                    </View>
            }
        </>
    )
}