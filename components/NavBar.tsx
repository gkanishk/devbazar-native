import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { styles } from "./styles";
const appLogo = require("../assets/logo.png");

export default function NavBar() {
    const navigation: any = useNavigation();
    return (
        <SafeAreaView
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
            >
                <Image
                    source={appLogo}
                    style={{
                        width: 75,
                        height: 35
                    }}
                />
            </TouchableOpacity>
            <View style={tw`flex flex-row`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("WishList")}
                    style={tw`p-1 mr-2`}
                >
                    <EvilIcon name="heart" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Cart")}
                    style={tw`p-1`}
                >
                    <EvilIcon name="cart" size={28} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
