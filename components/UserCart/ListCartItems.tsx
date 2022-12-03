import React from "react";
import { View, Text, Image, Dimensions, Platform } from "react-native";
import { Card, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hook";
import { getCart } from "../../features/User/user.slice";
import { useProductItems } from "../../hooks/useProductItems";
import { quantityOptions, sizesOption } from "../../assets/filter";
import RNPickerSelect from 'react-native-picker-select';
import FAIcon from "react-native-vector-icons/FontAwesome";





export default function ListCartItems() {
    const userState = useAppSelector((state) => state.user)
    const cartItems = useAppSelector(getCart);
    const { getDiscounterPrice,
        getDeliveryDate,
        removeFromCart,
        moveToWishList,
        updateItemCount,
        getPriceDetails,
        placeOrder
    } = useProductItems(userState);


    return (
        <View>
            <View style={tw`flex flex-row items-center justify-between px-4`}>
                <Text style={tw`text-lg font-bold`}>Cart ({getPriceDetails().itemCount})</Text>
                <Text style={tw`font-semibold`}>Total: Rs.{getPriceDetails().finalAmount}</Text>
            </View>
            <View
                style={{
                    display: "flex",
                    flexGrow: 1,
                    paddingBottom: 5
                }}
            >
                {
                    cartItems.map(({ item: { id, discount, quantity, name, price, attributes: { img, brand, sizes } }, count }, index) => (
                        <Card
                            containerStyle={tw`bg-white`}
                            wrapperStyle={tw`flex flex-row`}
                            key={id + count}
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
                                    width: Dimensions.get("window").width * 0.6,
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
                                    >Rs. {getDiscounterPrice(price, discount)}</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: Dimensions.get("window").width * 0.6,
                                    marginVertical: 5
                                }}>
                                    <Text
                                        style={{
                                            fontWeight: "200",
                                            fontSize: 13
                                        }}
                                    >
                                        By: {brand ?? "Levis"}
                                    </Text>
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: "300"
                                    }}>
                                        <Text style={{ textDecorationLine: "line-through" }}>
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
                                    style={tw`flex flex-row justify-start mt-2 items-center`}
                                >
                                    <View style={tw`flex flex-row items-center`}>
                                        <Text>Qty:</Text>
                                        <RNPickerSelect
                                            value={count}
                                            onValueChange={(value) => updateItemCount(value, index)}
                                            items={quantityOptions.slice(0, quantity)}
                                            style={{
                                                viewContainer: {
                                                    marginLeft: 5,
                                                    width: 40
                                                },
                                                iconContainer: {
                                                    marginTop: 2,
                                                    marginRight: 8
                                                }
                                            }}
                                            Icon={() => {
                                                return <FAIcon
                                                    name="chevron-down"
                                                    size={10}
                                                />
                                            }}
                                        />
                                    </View>
                                    <View style={tw`flex flex-row items-center ml-2`}>
                                        <Text>Size:</Text>
                                        <RNPickerSelect
                                            value={sizes[0]}
                                            items={sizesOption}
                                            onValueChange={(value: string) => console.log(value)}
                                            style={{
                                                viewContainer: {
                                                    marginLeft: 5,
                                                    width: 40
                                                },
                                                iconContainer: {
                                                    marginTop: 2,
                                                    marginRight: 8
                                                }
                                            }}
                                            Icon={() => {
                                                return <FAIcon
                                                    name="chevron-down"
                                                    size={10}
                                                />
                                            }}
                                        />
                                    </View>
                                </View>
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
                                        onPress={() => removeFromCart(index, true)}
                                    />
                                    <Button
                                        title="Move to wishlist"
                                        type="clear"
                                        buttonStyle={tw`p-0 m-2`}
                                        titleStyle={tw`text-sm`}
                                        onPress={() => moveToWishList(id, index)}
                                    />
                                </View>
                            </View>
                        </Card>
                    ))
                }
                <Card
                    containerStyle={tw`px-4`}
                >
                    <Text style={tw`mb-2 font-semibold`}>
                        PRICE DETAILS ({getPriceDetails().itemCount} ITEM)
                    </Text>
                    <View style={tw`flex flex-row items-center justify-between`}>
                        <Text>Total MRP</Text>
                        <Text>Rs. {getPriceDetails().mrp}</Text>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between`}>
                        <Text>Discount on MRP</Text>
                        <Text style={tw`text-green-500`}>- Rs. {getPriceDetails().totalDiscount}</Text>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between`}>
                        <Text>Shipping Charge</Text>
                        <Text>{getPriceDetails().shippingCost > 0 ? getPriceDetails().shippingCost : "FREE"}</Text>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between my-2`}>
                        <Text>Total Amount</Text>
                        <Text style={tw`font-semibold`}>Rs. {getPriceDetails().finalAmount}</Text>
                    </View>
                    <Button
                        title="Place Order"
                        buttonStyle={tw`bg-red-500 py-1 my-2`}
                        titleStyle={tw`text-base`}
                        onPress={placeOrder}
                    />
                </Card>
            </View>
        </View>
    );
}