import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input.jsx";
import Camera from "../components/Camera.jsx";
import { useState } from "react";

export default function CreateSightScreen() {
    
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [country, setCountry] = useState();    
    const [photo, setPhoto] = useState();

    return (
        <View style={styles.photoCard}>
                                
            {photo ? (
                    <View>
                        <View>
                            <Image source={{ uri: photo }} style={styles.imagePreview} />
                        </View>

                        <Camera onPhotoTaken={setPhoto} retake={true}/>

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
                    </View>        
            ) : (
                <View>
                    <ImageBackground
                        source={require("../../assets/film-strip.jpg")}
                        style={styles.placeholder}
                        imageStyle={{borderRacdius: 20}}
                    >
                        <View>
                            <Text style={styles.placeholderText}>Your photo will appear here</Text>
                        </View>
                    </ImageBackground>

                    <Camera onPhotoTaken={setPhoto}/>
                </View>                            
            )}
        </View>
            
    );
}

const styles = StyleSheet.create({

    
    photoCard: {
        background: "#fff",
        borderRadius: 30,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
        elevation: 6,
        position: "relative",
        paddingBottom: 50,
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