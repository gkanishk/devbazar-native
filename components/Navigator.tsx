//Modules
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Components
import {WishListScreen,HomeScreen,ProductScreen,ProfileScreen,CartScreen} from "../screens";
import Footer from "./Footer";
import NavBar from "./NavBar";
import LoginScreen from "../screens/LoginScreen";


export default function Navigator({screen}:{screen:string}) {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <NavBar />
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerShown: false
            }}>
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Product" component={ProductScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="WishList" component={WishListScreen} />
                </Stack.Group>
            </Stack.Navigator>
            {
                ["Home","Profile"].includes(screen) && <Footer/>
            }
        </>
    )
}
