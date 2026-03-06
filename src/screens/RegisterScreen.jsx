import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import  Button  from '../components/Button'
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/useAuth.js";
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { confirmPasswordReset } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import FormWrap from "../components/FormWrap.jsx";

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register, isLoading, error, clearError} = useAuth();

    const navigation = useNavigation();

    const { control, errors, handleSubmit} = useFormSight({
            username: username || '',
            email: email || '',
            password: '',
            confirmPassword: '',
        });

    const onSubmit = async (data) => {
        if(saving ) return;
            // if(!username||!email || !password || !confirmPassword ) return;    
            // if(password !== confirmPassword) { alert("Passwords do not match!"); return }
            // react-hook-form comparison inside the schema
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
        <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={styles.gradient}>
            <SafeAreaView style={{ flex: 1}}>
                <KeyboardAwareScrollView
                    enableOnAndroid = {true}
                    keyboardShouldPersistTaps="handled"
                    enableAutomaticScroll={true}
                    extraHeight={80}
                    extraScrollHeight={80}
                    contentContainerStyle={styles.container}
                    keyboardOpeningTime={0}
                >
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join us and share yhour story.</Text>

                    <View style={styles.formCard}>
                        <View style={styles.inputGroup}>
                            <Ionicons name="person-outline" size={20} color={"#7d3d94"}/>
                            {/* <TextInput 
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                                style={styles.input}
                                placeholderTextColor={"#7d3d94"}
                            /> */}
                            <FormWrap
                                control={control}
                                name="username" 
                                error={errors.username}
                                placeholder="Username"
                                style={styles.input}
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Ionicons name="mail-outline" size={20} color={"#7d3d94"}/>
                            <FormWrap 
                                control={control}
                                name="email" 
                                error={errors.username}
                                placeholder="Email"
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Ionicons name="lock-closed-outline" size={20} color={"#7d3d94"}/>
                            <FormWrap 
                                control={control}
                                name="password" 
                                error={errors.password}
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Ionicons name="lock-closed-outline" size={20} color={"#7d3d94"}/>
                            <TextInput 
                                control={control}
                                name="confirmPassword" 
                                error={errors.connfirmPassword}
                                placeholder="Confirm Password"
                                style={styles.input}
                                secureTextEntry
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>
                        
                        {error && (
                            <Text style={{ color: "red", marginBottom: 11}}>{error}</Text>
                        )}

                        <Button
                            title="Register"
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            loading={isLoading}
                            style={styles.button}
                        />
                        
                        <TouchableOpacity style={{ marginTop: 16}} onPress={() => navigation.goBack()}>
                            <Text style={{ color: "#7d3d94", textAlign: 'center'}}>
                                Already have an account? CLick to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    </LinearGradient>
    )
}



const styles = StyleSheet.create({
    gradient: {flex: 1},
    container: { padding: 20, flexGrow: 1, justifyContent: 'center'},
    title: {
        fontSize: 28,
        fontWeight: "900",
        textAlign: 'center',
        color: "#793d94",
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: 'center',
        color: "#793d94",
        marginBottom: 28
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 26,
        padding:20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 11,
        elevation: 6,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2e3f0",
        borderRadius: 20,
        paddingHorizontal: 14,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
         shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 2,
    },
    input: {
        flex: 1,
        paddingVertical: 11,
        paddingHorizontal: 8,
        color: "#000",
        fontWeight: "500",
    },
    button: {
        color: "#fff",
        backgroundColor: "#793d94",
    }
})