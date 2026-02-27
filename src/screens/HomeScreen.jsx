import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView, KeyBoardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { 
        View,
        Text,
        StyleSheet,
        ScrollView,
        ImageBackground,
        KeyboardAvoidingView,
        Platform
    } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Camera from "../components/Camera.jsx";
import CreateSightScreen from "./CreateSightScreen.jsx";

export default function HomeScreen() {

    return (
        <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={styles.gradient}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid = {true}
                keyboardShouldPersistTaps = "handled"
                >
                
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Share Your World</Text>
                    <Text style={styles.subtitle}>Every place has a story. Inspire others.</Text>
                    <CreateSightScreen style={styles.photoCard}/>
                </ScrollView>
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {flex: 1},

    container: { padding: 20, paddingTop: "25%" },

    title: { 
        fontSize: 28, 
        fontWeight: "900", 
        textAlign:"center", 
        color: "#7d3d94", 
        marginBottom: 8
    },

    subtitle: { 
        fontSize: 16, 
        fontStyle: "italic", 
        textAlign:"center", 
        color: "#7d3d94", 
        marginBottom: 30
    },
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
        backgroundColor: "transperant",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        overflow: "hidden", 
        alignItems: "left",
        borderColor: "#7d3d94",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
    },
    placeholderText: { color: "#7d3d94", fontSize: 16, fontStyle: "italic", fontWeight: "600", padding: 14 },

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
})