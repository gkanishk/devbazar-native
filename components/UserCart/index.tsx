import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hook";
import { getCart } from "../../features/User/user.slice";
import ListCartItems from "./ListCartItems";
const emptyCart = require("../../assets/emptyCart.png");

export default function UserCart() {
    const navigation:any = useNavigation();
    const cartItems = useAppSelector(getCart);
    return (
        <>
        {
            cartItems.length > 0 ?
            <ScrollView>
                <ListCartItems/>
            </ScrollView>
            :
            <View style={tw`flex items-center justify-center flex-1`}>
            <Image
                source={emptyCart}
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 10
                }}
                resizeMode="contain"
            />
            <Text style={tw`mb-4`}>
            There is nothing in your cart, let's add some items.
            </Text>
            <Button
                title="Add Items from Wishlist"
                type="outline"
                buttonStyle={tw`py-2 m-2`}
                onPress={() => navigation.navigate("WishList")}
            />
        </View>
        }
        </>
    );
}