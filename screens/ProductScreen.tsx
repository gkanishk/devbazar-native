import React from "react";
import { Text, ScrollView, View, Dimensions, TouchableOpacity } from "react-native";
import { useAppSelector } from "../app/hook";
import { getProducts, getFilteredProduct } from "../features/Products/products.slice";
import { Card, Button, Image } from 'react-native-elements'
import tw from "tailwind-react-native-classnames";
import AntIcon from "react-native-vector-icons/AntDesign";
import ProductFooter from "../components/ProductFooter";


export default function ProductScreen() {
    const products: Array<any> = useAppSelector(getProducts);
    const filteredProducts: Array<any> = useAppSelector(getFilteredProduct);
    return (
        <>
            {
                products.length>0?
                <>
                <ScrollView style={tw`py-2`}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        position: "relative",
                        flexGrow: 1,
                        paddingHorizontal: 10
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
                                    <TouchableOpacity>
                                        <AntIcon
                                            name="hearto"
                                            size={18}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={tw`font-thin text-xs text-gray-600`}>
                                    {name}
                                </Text>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`text-sm`}>Rs. {price}{" "}</Text>
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
                                    />
                                </View>
                                {   quantity===0&&
                                    <Text style={tw`text-xs text-right text-gray-500`}>
                                    Out Of Stock
                                    </Text>
                                }
                            </Card>
                        ))
                    }
                </View>
            </ScrollView>
            <ProductFooter/>
            </>
                :<Text>
                    Loading
                </Text>
            }
        </>
    )
}