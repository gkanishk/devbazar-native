import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { styles } from "./styles";

export default function NavBar() {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text style={tw`text-xl font-semibold`}
                // @ts-ignore
                onPress={() => navigation.navigate("Home")}
            >Dev Bazar</Text>
            <View style={tw`flex flex-row`}>
                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate("WishList")}
                    style={tw`p-1 mr-2`}
                >
                    <EvilIcon name="heart" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate("Cart")}
                    style={tw`p-1`}
                >
                    <EvilIcon name="cart" size={28} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
