import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text, SafeAreaView,TouchableOpacity, ScrollView, Image } from "react-native";
import { Card } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { promotionImages } from "../assets/screens";


export default function HomeScreen() {
    const navigation: any = useNavigation();
    return (
        <SafeAreaView style={{display: "flex",flex:1}}>
        <ScrollView>
            <Text style={tw`p-4 pb-0 text-base font-semibold`}>
                Deal Of The Day
            </Text>
                <View
                style={tw`flex flex-row flex-wrap justify-evenly`}
                >
                   { promotionImages.slice(0,4).map((imgUrl)=>(
                    <Card
                    containerStyle={{
                        width: 140
                    }}
                    >
                        <TouchableOpacity
                        onPress={()=>navigation.navigate("Product")}
                        >
                        <Image
                        source={{uri: imgUrl}}
                        style={{
                            width: 100,
                            height: 150
                        }}
                        />
                        </TouchableOpacity>
                    </Card>
                ))}
                </View>
                <Text style={tw`p-4 pb-0 text-base font-semibold`}>
                Top Brands
                </Text>
                <View
                style={tw`flex flex-row flex-wrap pb-2 justify-evenly`}
                >
                   { promotionImages.slice(4,8).map((imgUrl)=>(
                    <Card
                    containerStyle={{
                        width: 140
                    }}
                    >
                        <TouchableOpacity
                        onPress={()=>navigation.navigate("Product")}
                        >
                        <Image
                        source={{uri: imgUrl}}
                        style={{
                            width: 100,
                            height: 150
                        }}
                        />
                        </TouchableOpacity>
                    </Card>
                ))}
                </View>
        </ScrollView>
        </SafeAreaView>
    )
}