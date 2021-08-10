import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useToast } from "react-native-styled-toast";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch } from "../../app/hook";
import { setLogin } from "../../features/User/user.slice";
import { getAxiosClient } from "../../hooks/useAxios";

export default function SignUpForm({ changeForm }: { changeForm: Function }) {
    const [name, setName] = useState<String>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [ isLoading, setLoading ] = useState(false);

    const dispatch = useAppDispatch();
    const route = useRoute();
    const { toast } = useToast();

    const authenticateUser = async () => {
        setLoading(true);
        try {
            if (email.length === 0 || password.length === 0 || name.length === 0){
                toast({
                    message: "Please enter all details",
                    intent: "ERROR"
                })
                setLoading(false);
            }
            const response = await getAxiosClient("").post(`/user/signup`, { name, email: email.toLowerCase(), password });
            if (response.data?.statusCode === 200) {
                dispatch(setLogin({
                    token: response.data.response.accessToken, userDetails: {
                        email: response.data?.response?.user?.email ?? "",
                        name: response.data?.response?.user?.name ?? ""
                    }
                }));
                // @ts-ignore
                navigation.navigate(route.params?.referer ?? "Product");
                toast({
                    message: 'SignUp Successful.'
                });
                setLoading(false);
            }
        } catch (error) {
            toast({
                message: "Login Failed! Please check details",
                intent: "ERROR"
            });
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={tw`w-96 bg-white p-2 rounded`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={tw`font-semibold text-2xl px-2 mb-4 text-center mt-2`}>
                Sign-Up
            </Text>
            <Input
                placeholder='Name'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                leftIconContainerStyle={tw`mr-2`}
                onChangeText={(value => setName(value))}
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                leftIconContainerStyle={tw`mr-2`}
                onChangeText={(value => setEmail(value))}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome-5', name: 'key' }}
                secureTextEntry={true}
                leftIconContainerStyle={tw`mr-2`}
                onChangeText={(value => setPassword(value))}
            />
            <View>
                <Button
                    title="Sign-Up"
                    containerStyle={tw`m-2`}
                    onPress={authenticateUser}
                    loading={isLoading}
                />
            </View>
            <Text style={tw`text-center m-8 flex flex-row items-center`}>
                Already have an account?{" "}
                <Text style={tw`p-0 text-blue-400 ml-4`} onPress={() => changeForm()}>Login</Text>
            </Text>
        </KeyboardAvoidingView>
    );
}