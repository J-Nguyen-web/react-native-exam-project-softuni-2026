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
import { Controller } from "react-hook-form";
import  DateTimePicker from "@react-native-community/datetimepicker";

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
        rating: sight?.rating || 0,
        country: sight?.country || '',
        city: sight?.city || '',
        liked: sight?.liked || false,
        startDate: sight?.startDate ? new Date(sight.startDate) : new Date(),
        endDate: sight?.endDate ? new Date(sight.endDate) : new Date()
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
                            label="Title"
                            error={errors.title} 
                            placeholder="Name your sight"
                            style={globalStyles.input}
                            icon={<MaterialIcons name="title" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="description" 
                            label="Description"
                            error={errors.description}  
                            placeholder="Why is special..."
                            multiline = {true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            style={[globalStyles.input, {minHeight: 80, flex: 1}]}
                            icon={<FontAwesome name="file-text-o" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="country"
                            label="Country"
                            error={errors.country} 
                            placeholder=""
                            style={globalStyles.input}
                            icon={<Feather name="flag" size={20} color={globalColor.primary} />}
                        />
                        <FormWrap
                            control={control}
                            name="city" 
                            label="City"
                            error={errors.city} 
                            placeholder=""
                            style={globalStyles.input}
                            icon={<MaterialIcons name="location-city" size={20} color={globalColor.primary} />}
                        />
                        <View style={globalStyles.container}>
                            <Text style={[globalStyles.subtitle, {fontSize: 20 }]}>
                                Best time to visit
                            </Text>
                            
                            <View style={{flexDirection: "row", gap: 14}}>
                                <Controller
                                    control={control}
                                    name="startDate"
                                    defaultValue={new Date()}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{flex:1, alignItems: "center"}}>
                                            <Text style={{color: globalColor.primary}}>Start</Text>
                                            <DateTimePicker
                                                value={value || new Date()}
                                                mode="date"
                                                display="compact"
                                                onChange={(event, date) => {
                                                    if(date) {
                                                        onChange(date)
                                                    }
                                                }}
                                            />
                                        </View>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="endDate"
                                    defaultValue={new Date()}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{flex:1, alignItems: "center"}}>
                                            <Text style={{color: globalColor.primary}}>End</Text>
                                            <DateTimePicker
                                                value={value || new Date()}
                                                mode="date"
                                                display="compact"
                                                onChange={(event, date) => {
                                                    if(date) {
                                                        onChange(date)
                                                    }
                                                }}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                        <Controller
                            control={control}
                            name="category"
                            defaultValue="nature"
                            render={({ field: { onChange, value } }) => (
                                <View style={{paddingTop: 20}}>
                                    <Text style={[globalStyles.subtitle, {fontSize: 20 }]}>Category</Text>
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={onChange}
                                    >
                                        <Picker.Item label="Nature" value="Nature" />
                                        <Picker.Item label="Mountain" value="Mountain" />
                                        <Picker.Item label="Sea Side" value="Sea Side" />
                                        <Picker.Item label="City Landmarks" value="City Landmarks" />
                                        <Picker.Item label="Religious" value="Religious" />
                                        <Picker.Item label="Historical" value="Historical" />
                                    </Picker>
                                </View>
                            )}
                        />
                            
                        </View>
                        
                        {/* <Controller
                            control={control}
                            name="rating"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text>Rating</Text>
                                    <StarsRating value={value} onChange={onChange}   />
                                </View>
                            )}
                        />
                        <Controller 
                            control={control}
                            name="liked"
                            defaultValue={0}
                            render={({ field: { onChange, value } }) => (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
                                    <Text>Liked</Text>
                                    
                                    <Switch 
                                        value={value} 
                                        onValueChange={onChange}   
                                    />
                                </View>
                            )}
                        /> */}
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

})