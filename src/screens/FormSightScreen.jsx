import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input.jsx";
import Camera from "../components/Camera.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";
import { useSight } from "../context/useSight.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker'
import { useFormSight } from "../validators/useFormSight.js";
import FormWrap from "../components/FormWrap.jsx";

export default function FormSightScreen( {route, navigation}) {
    
    // const [title, setTitle] = useState(sight?.title || '');
    // const [description, setDescription] = useState(sight?.description || '');
    // const [country, setCountry] = useState(sight?.country || '');
    // const [city, setCity] = useState(sight?.city || '');
    const {sight, isEdit,initialPhoto} = route.params;
    const [tempUri, setTempUri] = useState(initialPhoto || sight?.photo || null);
    const [saving, setSaving] = useState(false);

    const { createSight, updateSight } = useSight();
    const { control, errors, handleSubmit} = useFormSight({
        title: sight?.title || '',
        description: sight?.description || '',
        country: sight?.country || '',
        city: sight?.city || '',
    });

    const makeUriUsable = async(tempUri) => {
        if(!tempUri) return null;

        const pickedImage = {
            canceled: false,
            assets: [{ uri: tempUri}],
        }
        return pickedImage.assets[0].uri;
    }

    const onSubmit = async (data) => {
        if(saving ) return;
        if(!tempUri) {
            Alert("Please add photo");
        return;
        }
        setSaving(true)

        try {              
            
            const usableUri = await makeUriUsable(tempUri)
            
            const sightData = { ...data, photo: usableUri  };
            
            let result;
            if(isEdit && sight?.id) {
                result = await updateSight(sight.id, sightData)
            } else {
                result = await createSight(sightData)
            }
            navigation.replace('Details', {id: result.id})

        } finally {
            setSaving(false)
        }
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
                        <Image source={{ uri: tempUri }} style={styles.imagePreview} />
                    </View>

                    <Camera onPhotoTaken={setTempUri} retake={true}/>

                    <View style={styles.formContainer}>
                            <FormWrap
                                control={control}
                                name="title" 
                                error={errors.title} 
                                label="Title"
                                placeholder="What we see..."
                            />
                            <FormWrap
                                control={control}
                                name="description" 
                                error={errors.description}  
                                label="Description"
                                placeholder="What is special about that place..."
                            />
                            <FormWrap
                                control={control}
                                name="country" 
                                error={errors.country} 
                                label="Country"
                                placeholder=""
                            />
                            <FormWrap
                                control={control}
                                name="city" 
                                error={errors.city} 
                                label="City"
                                placeholder=""
                            />
                            <Button
                                title={!isEdit ? 'Upload Sight' : 'Update sight'}
                                //todo icon
                                onPress={handleSubmit(onSubmit)}
                                loading={saving}
                                disabled={saving}
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