import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useToast } from "react-native-styled-toast";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch } from "../../app/hook";
import { setCart, setLogin, setWishlist } from "../../features/User/user.slice";
import { getAxiosClient } from "../../hooks/useAxios";

export default function LoginForm({ changeForm }: { changeForm: Function }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [ isLoading, setLoading ] = useState(false);
    const [ testLoginLoading, setTestLoading ] = useState(false);
    const dispatch = useAppDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const { toast } = useToast();

    const loginAsGuest = () => {
        setTestLoading(true);
        authenticateUser("kanishk@hotmail.com","123456");
    }

    const authenticateUser = async (userEmail:string, userPassword: string) => {
        try {
            if (userEmail.length === 0 || userPassword.length === 0){
                toast({
                    message: "Please enter all details",
                    intent: "ERROR"
                });
                setLoading(false);
                return setTestLoading(false);
            }
            const response = await getAxiosClient("").post(`/user/login`, { email: userEmail.toLowerCase(), password: userPassword });
            if (response.data?.statusCode === 200) {
                dispatch(setLogin({
                    token: response.data.response.accessToken, userDetails: {
                        email: response.data?.response?.user?.email ?? "",
                        name: response.data?.response?.user?.name ?? ""
                    }
                }));
                dispatch(setCart(response.data?.response?.user?.cart ?? []));
                dispatch(setWishlist(response.data?.response?.user?.wishlist ?? []));
                setTestLoading(false);
                setLoading(false);
                toast({
                    message: 'Login Successful.'
                });
                // @ts-ignore
                navigation.navigate(route.params?.referer ?? "Product");
            }
        } catch (error) {
            toast({
                message: "Login Failed! Please check details",
                intent: "ERROR"
            })
            setTestLoading(false);
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={tw`w-96 bg-white p-2 rounded`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={tw`font-semibold text-2xl px-2 mb-4 text-center mt-2`}>
                Login
            </Text>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                leftIconContainerStyle={tw`mr-2`}
                onChangeText={value => setEmail(value)}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome-5', name: 'key' }}
                secureTextEntry={true}
                leftIconContainerStyle={tw`mr-2`}
                onChangeText={value => setPassword(value)}
            />
            <View>
                <Button
                    title="Login"
                    type="outline"
                    containerStyle={tw`m-2`}
                    onPress={()=>{
                        setLoading(true);
                        authenticateUser(email,password);  
                    }}
                    loading={isLoading}
                />
                <Button
                    title="Login as Guest"
                    containerStyle={tw`m-2`}
                    loading={testLoginLoading}
                    onPress={loginAsGuest}
                />
            </View>
            <Text style={tw`text-center m-8 flex flex-row items-center justify-center`}>
                Don't have an account?{" "}
                <Text style={tw`p-0 text-blue-400 ml-4`} onPress={() => changeForm()} >Sign-Up</Text>
            </Text>
        </KeyboardAvoidingView>
    );
}