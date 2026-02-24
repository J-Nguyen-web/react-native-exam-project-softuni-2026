
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ImageBackground
    
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Camera from "../components/Camera.jsx";
import Input from "../components/Input.jsx";

export default function HomeScreen() {
    
    const [photo, setPhoto] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [country, setCountry] = useState();

    console.log(photo)

    return (
        <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={styles.gradient}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Share Your World</Text>
                    <Text style={styles.subtitle}>Every place has a story. Inspire others.</Text>

                    <View style={styles.photoCard}>
                        {photo ? (
                                <KeyboardAvoidingView>
                                    <View>
                                        <Image source={{ uri: photo }} style={styles.imagePreview} />
                                    </View>
                                
                                    <View style={styles.formContainer}>
                                            <Input 
                                                label="Title"
                                                placeholder="What we see..."
                                                value={title}
                                                onChangeText={setTitle}
                                            />
                                            <Input 
                                                label="Description"
                                                placeholder="What is special about that place..."
                                                value={description}
                                                onChangeText={setDescription}
                                            />
                                            <Input
                                                label="Country"
                                                placeholder="In which country it is"
                                                value={country}
                                                onChangeText={setCountry}
                                            />
                                    </View>
                                </KeyboardAvoidingView>
                        ) : (
                            <Camera onPhotoTaken={setPhoto} />
                            
                        )}
                    </View>
                    
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {flex: 1},
    container: { padding: 20, paddingTop:38 },
    title: { fontSize: 28, fontWeight: "900", textAlign:"center", color: "#7d3d94", marginBottom: 8},
    subtitle: { fontSize: 16, fontStyle: "italic", textAlign:"center", color: "#7d3d94", marginBottom: 30},

    photoCard: {
        background: "#fff",
        borderRadius: 30,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
        elevation: 6,
        position: "relative"
    },

    placeholder: {
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    placeholderText: { color: "#028273", fontSize: 16, fontWeight: "600" },

    imagePreview: { 
        width: "100%", 
        height: 220, 
        borderRadius: 20, 
        marginBottom: 8,
    
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 11,
        borderColor: "#000"
    },

    formContainer: {
        marginTop: 16,
        width: "100%",
    },

    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: 26,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 11,
        elevation: 6,
    },

    input: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 14,
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 16,
        color: "#35701e",
        fontWeight: "500",
    },

    publishButton: {
        background: "#50bdf0",
        paddingVertical: 16,
        borderRadius: 22,
        alignItems: "center",
    },
    publishtext: { color: "#fff", fontWeight: "900", fontSize: 18},

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#ffffff",
    },
    });