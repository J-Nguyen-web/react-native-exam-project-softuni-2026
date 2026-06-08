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
    
// TODO RESET PASSWORD INVITE BY GOOGLE PROFILE

// My Comments

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>
                        {user.displayName}
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

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>My Activity</Text>

                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate("MySights",{ type: 'created', title: 'My Sights'})}
                >
                <View style={styles.menuLeft}>
                    <Entypo name="image" size={22} color={globalColor.primary} />
                    <Text  style={styles.menuText}>My Sights</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#aaa"/>
                </TouchableOpacity>

                 <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate("MySights",{ type: 'favorite', title: 'Favorite'})}
                >
                    <View style={styles.menuLeft}>
                        <Entypo name="heart" size={22} color="#ff6b81" />
                        <Text style={styles.menuText}>My Favorite</Text>
                    </View>
                <Entypo name="chevron-right" size={20} color="#aaa"/>
                </TouchableOpacity>

                 <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate("MySights",{ type: 'rated', title: 'My Rated Sights'})}
                >
                    <View style={styles.menuLeft}>
                        <Entypo name="star" size={22} color="#f9b600" />
                        <Text style={styles.menuText}>My Rated Sights</Text>
                    </View>
                <Entypo name="chevron-right" size={20} color="#aaa"/>
                </TouchableOpacity>

                 <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate("MySights",{ type: 'rated', title: 'My comments'})}
                >
                    <View style={styles.menuLeft}>
                        <Entypo name="chat" size={22} color="#4f9dfd" />
                        <Text style={styles.menuText}>My Comments</Text>
                    </View>
                    <Entypo name="chevron-right" size={20} color="#aaa"/>
                </TouchableOpacity>
                </View>                
                <View style={{paddingTop: 50}}>
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
    section: {
        width: "100%",
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: globalColor.primary,
        marginBottom: 14,
        marginLeft: 6,
    },

    menuItem: {
        backgroundColor: '#f8ecec',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderRadius: 20,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowRadius: 9,
        elevation: 3,
    },

    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    
    menuText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 14,
        color: "#333",
    },
})