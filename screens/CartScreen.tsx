import { Text, View, Image } from "react-native";
import React from "react";
import { useAppSelector } from "../app/hook";
import { getUserLoginned } from "../features/User/user.slice";
import tw from "tailwind-react-native-classnames";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import UserCart from "../components/UserCart";
const LoginIcon = require("../assets/cart.png");
export default function CartScreen() {
    const isUserLoginned = useAppSelector(getUserLoginned);
    const naavigation = useNavigation();
    return (
        <>
            {
                isUserLoginned ?
                    <View style={tw`flex flex-1 p-2`}>
                        <UserCart/>
                    </View> :
                    <View style={tw`flex items-center flex-1 justify-center`}>
                        <Text style={tw`text-lg font-bold`}>
                            PLEASE LOGIN
                        </Text>
                        <Text>
                            TO VIEW ITEMS IN CART
                        </Text>
                        <Image
                            source={LoginIcon}
                            style={{
                                width: 300,
                                height: 200,
                                margin: 10
                            }}
                            resizeMode="contain"
                        />
                        <Button
                            title="Login"
                            type="outline"
                            containerStyle={tw`mt-4`}
                            buttonStyle={tw`px-6 py-1`}
                            // @ts-ignore
                            onPress={() => naavigation.navigate("Login",{referer: "Cart"})}
                        />
                    </View>
            }
        </>
    )
}