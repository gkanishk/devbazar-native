import React from "react";
import { Text, ScrollView, View, Dimensions, TouchableOpacity, Platform, Image, ActivityIndicator } from "react-native";
import { useAppSelector } from "../app/hook";
import { getFilteredProduct } from "../features/Products/products.slice";
import { Card, Button } from 'react-native-elements'
import tw from "tailwind-react-native-classnames";
import AntIcon from "react-native-vector-icons/AntDesign";
import ProductFooter from "../components/ProductFooter";
import { useProductItems } from "../hooks/useProductItems";
const noDataImage = require("../assets/nodata.png");


export default function ProductScreen() {
    const filteredProducts: Array<any> = useAppSelector(getFilteredProduct);
    const isProductLoading: Boolean = useAppSelector((state) => state.products.isLoading);
    const userState = useAppSelector((state)=>state.user);
    const { isItemInWishList, getDiscounterPrice, addToCartWishList } = useProductItems(userState);
    return (
        <>
            {
                !isProductLoading ?
                    <>
                        <View style={tw`py-2 flex-1 pb-2`}>
                            {
                                filteredProducts.length > 0 ?
                                    <ScrollView>
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
                                            filteredProducts.map(({ name, id, category, price, discount, quantity, attributes: { brand, img, for: idealFor } }) => (
                                                <Card
                                                    containerStyle={{
                                                        width: "48%",
                                                        margin: 0,
                                                        marginBottom: 10,

                                                    }}
                                                    key={`${id}-${name}`}
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
                                                        onPress={()=>addToCartWishList(id,"addToWishList")}
                                                        disabled={isItemInWishList(id)}
                                                        >
                                                            <AntIcon
                                                                name={isItemInWishList(id)?"heart":"hearto"}
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
                                                            {" "}({discount}%)
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Button
                                                            title="Add to Cart"
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
                                                            disabled={quantity === 0}
                                                            onPress={()=>addToCartWishList(id,"addToCart")}
                                                        />
                                                    </View>
                                                    {quantity === 0 &&
                                                        <Text style={tw`text-xs text-right text-gray-500`}>
                                                            Out Of Stock
                                                        </Text>
                                                    }
                                                </Card>
                                            ))
                                        }
                                    </View>
                                    </ScrollView>
                                    :
                                    <View
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    >
                                        <Image
                                        source={noDataImage}
                                        style={{
                                            width: 200,
                                            height: 200
                                        }}
                                        resizeMode="contain"
                                        />
                                        <Text style={tw`my-4 text-base`}>No Product</Text>
                                    </View>
                            }
                        </View>
                        {
                            Platform.OS !== "web" && <ProductFooter />
                        }
                    </>
                    : <View style={tw`flex items-center justify-center flex-1`}>
                        <ActivityIndicator color="#61DAFB" size="large" />
                    </View>
            }
        </>
    )
}