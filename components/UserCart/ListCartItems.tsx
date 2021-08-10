import React from "react";
import { View, ScrollView, Text, Image, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hook";
import { getCart } from "../../features/User/user.slice";
import { useProductItems } from "../../hooks/useProductItems";

export default function ListCartItems() {
    const userState = useAppSelector((state)=>state.user)
    const cartItems = useAppSelector(getCart);
    const {getDiscounterPrice, getDeliveryDate, removeFromCart, moveToWishList} = useProductItems(userState);
    return (
        <View>
            <Text style={tw`text-lg font-bold px-2`}>Cart</Text>
            <View 
            style={{
                display: "flex",
                flexGrow: 1,
                paddingBottom: 5
            }}
            >
                {
                    cartItems.map(({item:{id,quantity,discount,name,price,attributes:{img, brand}}},index)=>(
                        <Card
                        containerStyle={tw`bg-white`}
                        wrapperStyle={tw`flex flex-row`}
                        key={id}
                        >
                            <Image
                            style={{
                                width: 75,
                                height: 100
                            }}
                            source={{
                                uri: img
                            }}
                            resizeMode="contain"
                            />
                        <View style={tw`p-2 py-1`}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: Dimensions.get("window").width*0.6,
                        }}>
                        <Text
                        style={{
                            fontWeight: "500",
                            width: 165
                        }}
                        >{name}</Text>
                        <Text
                        style={{
                            fontWeight: "500"
                        }}
                        >Rs. {getDiscounterPrice(price,discount)}</Text>
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: Dimensions.get("window").width*0.6,
                            marginVertical: 5
                        }}>
                        <Text
                        style={{
                            fontWeight: "200",
                            fontSize: 13
                        }}
                        >
                            By: {brand??"Levis"}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "300"
                        }}>
                            <Text style={{textDecorationLine:"line-through"}}>
                            Rs. {price}
                            </Text>
                            <Text style={tw`text-red-500`}> ({discount}%)</Text>
                        </Text>
                        </View>
                        <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400"
                        }}
                        >
                            Deliver By: {getDeliveryDate()}
                        </Text>
                        <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }}
                        >
                            <Button
                            title="Remove"
                            type="clear"
                            buttonStyle={tw`p-0 m-2`}
                            titleStyle={tw`text-sm`}
                            onPress={()=>removeFromCart(index, true)}
                            />
                            <Button
                            title="Move to wishlist"
                            type="clear"
                            buttonStyle={tw`p-0 m-2`}
                            titleStyle={tw`text-sm`}
                            onPress={()=>moveToWishList(id,index)}
                            />
                        </View>
                        </View>
                        </Card>
                    ))
                }
            </View>
        </View>
    );
}