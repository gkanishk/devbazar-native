import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hook";
import { getWishList } from "../../features/User/user.slice";
import ListWishListItems from "./ListWishListItems";
const emptyImage = require("../../assets/empty.png");

export default function UserWishList() {
    const navigation: any = useNavigation();
    const wishListItems = useAppSelector(getWishList);
    return (
        <>
        {
            wishListItems.length > 0 ?
            <ScrollView>
                <ListWishListItems />
            </ScrollView>
            :
            <View style={tw`flex items-center justify-center flex-1`}>
            <Image
                source={emptyImage}
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 10
                }}
                resizeMode="contain"
            />
            <Text style={tw`mb-4`}>
                It's so lonaly here :(
            </Text>
            <Button
                title="Explore Products"
                type="outline"
                buttonStyle={tw`py-2 m-2`}
                onPress={() => navigation.navigate("Product")}
            />
        </View>
        }
        </>
    );
}