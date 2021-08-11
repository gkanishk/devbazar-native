import React from "react";
import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hook";
import { getDiscounterPrice } from "../../features/Products/product.service";
import { getWishList } from "../../features/User/user.slice";
import AntIcon from "react-native-vector-icons/AntDesign"
import { useProductItems } from "../../hooks/useProductItems";
export default function ListWishListItems() {
    const wishListItems = useAppSelector(getWishList);
    const userState = useAppSelector((state)=>state.user);
    const {removeFromWishList, moveToCart} = useProductItems(userState)
    return (
        <View style={tw`flex flex-1`}>
            <Text style={tw`font-bold text-lg p-2`}>
                My WishList ({wishListItems.length})
            </Text>
            <View
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                position: "relative",
                flexGrow: 1,
                paddingHorizontal: 10,
                paddingBottom: 5
            }}
            >
                {
                    wishListItems.map(({item:{id,quantity,discount,name,price,attributes:{img, brand}}})=>(
                        <Card
                                                    containerStyle={{
                                                        width: "49%",
                                                        margin: 0,
                                                        marginBottom: 10,

                                                    }}
                                                    key={`${id}-${name}-wishlist`}
                                                >
                                                    <Image
                                                        style={{
                                                            width: "100%",
                                                            height: Dimensions.get('window').width * 0.5 * 0.9,
                                                            resizeMode: "stretch"
                                                        }}
                                                        source={{
                                                            uri: img
                                                        }}
                                                    />
                                                    <View style={tw`flex flex-row justify-between pt-2`}>
                                                        <Text style={tw`font-semibold`}>{brand}</Text>
                                                        <TouchableOpacity
                                                        onPress={()=>removeFromWishList(id,true)}
                                                        >
                                                            <AntIcon
                                                                name={"delete"}
                                                                size={18}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={tw`font-thin text-xs text-gray-600`}>
                                                        {name}
                                                    </Text>
                                                    <View style={tw`flex flex-row items-center`}>
                                                        <Text style={tw`text-sm`}>Rs. {getDiscounterPrice(price,discount)}{" "}</Text>
                                                        <Text style={tw`text-xs line-through text-gray-400`}>Rs.{price}</Text>
                                                        <Text style={tw`text-xs text-red-400`}>
                                                            ({discount}%)
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Button
                                                            title="Move to Cart"
                                                            type="outline"
                                                            containerStyle={tw`my-2 border-gray-600`}
                                                            buttonStyle={{
                                                                paddingVertical: 2,
                                                                borderColor: "#000",
                                                                borderWidth: 0.25,
                                                                borderRadius: 3
                                                            }}
                                                            titleStyle={{
                                                                fontSize: 12,
                                                                color: "#000",
                                                                fontWeight: "300"
                                                            }}
                                                            onPress={()=>moveToCart(id)}
                                                            disabled={quantity === 0}
                                                        />
                                                    </View>
                                                    {quantity === 0 &&
                                                        <Text style={tw`text-xs text-right text-gray-500`}>
                                                            Out Of Stock
                                                        </Text>
                                                    }
                                                </Card>
                    )
                )
                }
            </View>
        </View>
    );
}