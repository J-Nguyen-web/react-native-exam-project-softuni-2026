import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import  Button  from '../components/Button'
import { useAuth } from "../context/useAuth.js";
import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { globalColor, globalStyles } from "../globalStyles.js";
import { useLoginForm } from "../validators/useLoginForm.js";
import FormWrap from "../components/FormWrap.jsx";

export default function LoginScreen() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // идват с data от useRegisterFOrm
    const { login, isLoading, error, clearError} = useAuth();

    const navigation = useNavigation();

    useEffect(() => {
    fetch("https://react-native-api-3.onrender.com/users")
      .then(res => res.json())
      .then(data => console.log("API works:", data))
      .catch(err => console.log("API error:", err));
  }, []);
  
    const { control, errors, handleSubmit} = useLoginForm({
            email: '',
            password: '',
        });

    const onSubmit = async (data) => {
        if(!data.email || !data.password ) return;
        try {
            await login({ email: data.email, password: data.password });
        } catch(error) {
            console.error("Error during login", error)
        }
    }

    return (
        <ScreenWrapper>                     
            <Text style={globalStyles.title}>Log in</Text>
            <Text style={globalStyles.subtitle}>Join us and share yhour story.</Text>

            <View style={globalStyles.formCard}>
                
                    <FormWrap
                        control={control}
                        name="email" 
                        label="E-mail"
                        error={errors.email}
                        placeholder="example@mail.com"
                        keyboardType="email-address"
                        style={globalStyles.input}
                        placeholderTextColor={globalColor.primary}
                        icon={<Ionicons name="mail-outline" size={20} color={globalColor.primary}/>}
                    />
                
                    <FormWrap
                        control={control}
                        name="password" 
                        label="Password"
                        error={errors.password}
                        placeholder=""
                        multiline={false}
                        secureTextEntry
                        style={globalStyles.input}
                        placeholderTextColor={globalColor.primary}
                        icon={<Ionicons name="lock-closed-outline" size={20} color={globalColor.primary}/>}
                    />
                                
                {error && (
                    <Text style={{ color: "red", marginBottom: 11}}>{error}</Text>
                )}

                <Button
                    title="Login"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    loading={isLoading}
                    style={globalStyles.button}
                />
                
                <TouchableOpacity style={{ marginTop: 16}} onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: globalColor.primary, textAlign: 'center'}}>
                        Don't have an account yet? Register here
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )}