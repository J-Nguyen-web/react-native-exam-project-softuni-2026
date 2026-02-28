import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input.jsx";
import Camera from "../components/Camera.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";
import { useSight } from "../context/useSight.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreateSightScreen( {route, navigation}) {
    
    const {initialPhoto} = route.params;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [photo, setPhoto] = useState(initialPhoto || null);

    const { createSight } = useSight();

    const saveSightHandler = async () => {
        const newSight = await createSight ({ photo, title , description, country, city });
        
        navigation.replace('Details', {id: newSight.id})
    }

    return (
        
        <View style={styles.photoCard}>
                                
            <KeyboardAwareScrollView
                enableOnAndroid = {true}
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll={true}
                extraHeight={140}
                extraScrollHeight={80}
                contentContainerStyle={styles.container}
                keyboardOpeningTime={0}
                >
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
                                placeholder=""
                                value={country}
                                onChangeText={setCountry}
                            />
                            <Input
                                label="City"
                                placeholder=""
                                value={city}
                                onChangeText={setCity}
                            />
                            <Button
                                title='Upload Sight'
                                //todo icon
                                onPress={saveSightHandler}
                                style={styles.submitButton}
                                />
                    </View>
                </View>  
            </KeyboardAwareScrollView>
            
        </View>
            
    );
}

const styles = StyleSheet.create({

    submitButton: {
        color: '#fff'
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