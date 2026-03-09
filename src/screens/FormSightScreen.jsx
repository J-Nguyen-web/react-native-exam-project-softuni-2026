import { Image, ImageBackground, StyleSheet, Switch, Text, View } from "react-native";
import Input from "../components/Input.jsx";
import Camera from "../components/Camera.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";
import { useSight } from "../context/useSight.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker'
import { useFormSight } from "../validators/useFormSight.js";
import FormWrap from "../components/FormWrap.jsx";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { globalColor, globalStyles } from "../globalStyles.js";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import StarsRating from "../components/StarsRating.jsx";

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
        category: sight?.category || '',
        rating: sight?.rating || '',
        country: sight?.country || '',
        city: sight?.city || '',
        liked: sight?.liked || '',
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
        
        <ScreenWrapper>
            {/* <View style={styles.photoCard}> */}
            <View style={globalStyles.formCard}>

                <View>
                    <Image source={{ uri: tempUri }} style={styles.imagePreview} />
                </View>

                <Camera onPhotoTaken={setTempUri} retake={true}/>

                        <FormWrap
                            control={control}
                            name="title" 
                            error={errors.title} 
                            placeholder="Title of your sight"
                            style={globalStyles.input}
                            icon={<MaterialIcons name="title" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="description" 
                            error={errors.description}  
                            placeholder="Describe your sight"
                            style={globalStyles.input}
                            icon={<FontAwesome name="file-text-o" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="description"
                            defaultValue="nature"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text>Category</Text>
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={onChange}
                                    >
                                        <Picker.Item label="Nature" value="nature" />
                                        <Picker.Item label="Mountain" value="mountain" />
                                        <Picker.Item label="Sea Side" value="sea" />
                                        <Picker.Item label="City Landmarks" value="city" />
                                        <Picker.Item label="Religious Site" value="religios" />
                                        <Picker.Item label="Historical Site" value="history" />
                                    </Picker>
                                </View>
                            )}
                        />
                        <FormWrap 
                            control={control}
                            name="rating"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text>Rating</Text>
                                    <StarsRating value={value} onChange={onChange}   />
                                </View>
                            )}
                        />
                        <FormWrap 
                            control={control}
                            name="rating"
                            render={({ field: { onChange, value } }) => (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
                                    <Text>Liked</Text>
                                    
                                    <Switch 
                                        value={value} 
                                        onChange={onChange}   
                                    />
                                </View>
                            )}
                        />
                        <FormWrap
                            control={control}
                            name="country" 
                            error={errors.country} 
                            placeholder="Country"
                            style={globalStyles.input}
                            icon={<Feather name="flag" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="city" 
                            error={errors.city} 
                            placeholder="City"
                            style={globalStyles.input}
                            icon={<MaterialIcons name="location-city" size={20} color={globalColor.primary} />}
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
        </ScreenWrapper>
            
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
    modernInput: {
        backgroundColor: "#f4e7f8",
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 18,
        fontSize: 16,
        color: "#7d3d94",
        borderWidth: 1,
        borderColor: "#af57a6",
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