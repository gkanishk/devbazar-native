import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { footerScreenOptions } from "../assets/screens";


export default function Footer() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                footerScreenOptions.map(({ name, icon }) => (
                    <TouchableOpacity 
                    style={tw`flex items-center`} 
                    // @ts-ignore
                    onPress={() => navigation.navigate(name)}
                    key={`${name}-${icon}`}
                    >
                        <AntIcon name={icon} size={20} color="black" />
                        <Text style={tw`font-light text-xs`}>
                            {name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}