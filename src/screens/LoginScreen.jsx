import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import  Button  from '../components/Button'
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/useAuth.js";
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error, clearError} = useAuth();

    const navigation = useNavigation();

    useEffect(() => {
    fetch("https://react-native-api-3.onrender.com/users")
      .then(res => res.json())
      .then(data => console.log("API works:", data))
      .catch(err => console.log("API error:", err));
  }, []);
  
    const validate = () => {
    // todo
    }
    const handleLogin = () => {
    if(!email || !password ) return;
    login({ email, password });
    }

    return (
        <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={styles.gradient}>
            <SafeAreaView style={{ flex:1}}>
                <KeyboardAwareScrollView
                    enableOnAndroid = {true}
                    keyboardShouldPersistTaps="handled"
                    enableAutomaticScroll={true}
                    extraHeight={80}
                    extraScrollHeight={80}
                    contentContainerStyle={styles.container}
                    keyboardOpeningTime={0}
                    >
                        
                    <Text style={styles.title}>Log in</Text>
                    <Text style={styles.subtitle}>Join us and share yhour story.</Text>

                    <View style={styles.formCard}>
                        <View style={styles.inputGroup}>
                            <Ionicons name="mail-outline" size={20} color={"#7d3d94"}/>
                            <TextInput 
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Ionicons name="lock-closed-outline" size={20} color={"#7d3d94"}/>
                            <TextInput 
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                secureTextEntry
                                placeholderTextColor={"#7d3d94"}
                            />
                        </View>
                        
                        {error && (
                            <Text style={{ color: "red", marginBottom: 11}}>{error}</Text>
                        )}

                        <Button
                            title="Login"
                            onPress={handleLogin}
                            disabled={isLoading}
                            loading={isLoading}
                            style={styles.button}
                        />
                        
                        <TouchableOpacity style={{ marginTop: 16}} onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: "#7d3d94", textAlign: 'center'}}>
                                Don't have an account yet? Register here
                            </Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    </LinearGradient>
    )}




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