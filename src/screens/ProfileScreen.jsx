import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColor } from "../globalStyles.js";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../context/useAuth.js";
import LogoutButton from "../components/LogoutButton.jsx";

export default function ProfileScreen() {
    const [photo, setPhoto] = useState(null);
    const [uploaded, setUploaded] = useState(false)
    const navigation = useNavigation();

    const {user} = useAuth()

    const pickImageHandler = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== "granted") {
            Alert.alert(
                "Permission required",
                "This app needs acces to your photo library to upload a profile picture"
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: false,
            quality: 0.6,
        });

        if(!result.canceled) {
            setPhoto(result.assets[0].uri);
            setUploaded(false);
        }
    };

    const uploadHandler = () => {
        setUploaded(true);
        Alert.alert("Photo uploaded succesfully!")
    }
    

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>
                        {user.username}
                    </Text>
                </View>
                    <View style={styles.avatarContainer}>
                        {!photo ? (
                            <TouchableOpacity style={styles.avatarFrame} onPress={pickImageHandler}>
                                <Text style={styles.avatarPlaceholder}><Entypo name="user" size={70} color={globalColor.primary} /></Text>
                                <Text style={styles.uploadText}>Upload Picture</Text>
                            </TouchableOpacity>
                        ) : (
                            <Image source={{ uri: photo }} style={styles.avatarFrame}/>
                        )}
                    </View>

                    {photo && !uploaded && (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.retakeButton} onPress={pickImageHandler}>
                                <Text style={styles.buttonText}>Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploadButton} onPress={uploadHandler}>
                                <Text style={styles.buttonText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                
                {photo && uploaded && (
                            <TouchableOpacity style={styles.changeButton} onPress={pickImageHandler}>
                                <Text style={styles.buttonText}>Change Photo</Text>
                            </TouchableOpacity>
                )}

                <TouchableOpacity 
                    style={styles.mySightsButton} 
                    onPress={() => navigation.navigate("MySights")}
                >
                    <Text style={styles.mySightsText}>My Sights</Text>
                </TouchableOpacity>
                
                <View style={{paddingTop: 150}}>
                    <LogoutButton />
                </View>
                
                
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        alignItems: "center",
    },
    usernameContainer: {
        marginBottom: 16,
    },
    usernameText: {
        fontSize: 22,
        fontWeight: "700",
        color: globalColor.primary,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatarFrame: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "#edd0e9",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowOffset: { width: 0, height: 6},
        shadowRadius: 14,
        elevation: 6,
        overflow: "hidden",
    },
    avatarPlaceholder: {
        fontSize: 60,
        marginBottom: 8,
        color: globalColor.primary,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: "600",
        color: globalColor.primary,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 220,
        marginBottom: 16,
    },
    retakeButton: {
        backgroundColor: "#f15a5a",
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 22,
    },
    uploadButton: {
        backgroundColor: "#6acaf7",
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 22,
    },
    changeButton: {
        backgroundColor: globalColor.primary,
                paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 22,
        marginBottom: 16,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 14,
        textAlign: "center",
    },
    mySightsButton: {
        marginTop: 8,
        paddingVertical: 14,
        paddingHorizontal: 36,
        backgroundColor: "#0584c8",
        borderRadius: 22,
    },
    mySightsText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
})