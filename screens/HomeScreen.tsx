import React from "react";
import { View, Text, SafeAreaView, Button, Alert, TouchableOpacity } from "react-native";
import {  } from "react-native-elements/dist/buttons/Button";
import tw from "tailwind-react-native-classnames";
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from "../components/Footer";

export default function HomeScreen() {
    return (
        <SafeAreaView style={{display: "flex",flex:1, justifyContent: "center", alignItems: 'center'}}>
        <View>
            <Text>
            Home page!!
            </Text>
        </View>
        </SafeAreaView>
    )
}