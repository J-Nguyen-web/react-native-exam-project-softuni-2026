import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import  Button  from '../components/Button'
import { useAuth } from "../context/useAuth.js";
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { confirmPasswordReset } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import FormWrap from "../components/FormWrap.jsx";
import { useRegisterForm } from "../validators/useRegisterForm.js";
import { globalColor, globalStyles } from "../globalStyles.js";
import ScreenWrapper from "../components/ScreenWrapper.jsx";

export default function RegisterScreen() {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState('');
    const { register, isLoading, error, clearError} = useAuth();

    const navigation = useNavigation();

    const { control, errors, handleSubmit} = useRegisterForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

    const onSubmit = async (data) => {
        if(saving ) return;
            // if(!username||!email || !password || !confirmPassword ) return;    
            // if(password !== confirmPassword) { alert("Passwords do not match!"); return }
            // react-hook-form comparison IS inside the schema
        setSaving(true)

        try {
            await register({
                email: data.email,
                password: data.password,
                username: data.username
             });
        } catch(error) {
            console.error("Error during registration", error)
        } finally {
            setSaving(false)
        }
        
    }    
    
    return (
        <ScreenWrapper>
            <Text style={globalStyles.title}>Create Account</Text>
            <Text style={globalStyles.subtitle}>Join us and share yhour story.</Text>

            <View style={globalStyles.formCard}>
                
                    <FormWrap
                        icon={<Ionicons name="person-outline" size={20} color={globalColor.primary}/>}
                        control={control}
                        name="username" 
                        error={errors.username}
                        placeholder="Username"
                        style={globalStyles.input}
                        placeholderTextColor={globalColor.primary}
                    />
                                
                    <FormWrap 
                        icon={<Ionicons name="mail-outline" size={20} color={globalColor.primary}/>}
                        control={control}
                        name="email" 
                        error={errors.email}
                        placeholder="Email"
                        style={globalStyles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholderTextColor={globalColor.primary}
                    />
                                
                    <FormWrap 
                        icon={<Ionicons name="lock-closed-outline" size={20} color={globalColor.primary}/>}
                        control={control}
                        name="password" 
                        error={errors.password}
                        placeholder="Password"
                        style={globalStyles.input}
                        secureTextEntry
                        placeholderTextColor={globalColor.primary}
                    />
                                
                    <FormWrap 
                        icon={<Ionicons name="lock-closed-outline" size={20} color={globalColor.primary}/>}
                        control={control}
                        name="confirmPassword" 
                        error={errors.confirmPassword}
                        placeholder="Confirm Password"
                        style={globalStyles.input}
                        secureTextEntry
                        placeholderTextColor={globalColor.primary}
                    />
                               
                {error && ( <Text style={{ color: "red", marginBottom: 11}} >{error}</Text>)}

                <Button
                    title="Register"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    loading={isLoading}
                    style={globalStyles.button}
                />
                
                <TouchableOpacity style={{ marginTop: 16}} onPress={() => navigation.goBack()}>
                    <Text style={{ color: globalColor.primary, textAlign: 'center'}}>
                        Already have an account? CLick to Login
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}



const styles = StyleSheet.create({
    gradient: {flex: 1},
    
})