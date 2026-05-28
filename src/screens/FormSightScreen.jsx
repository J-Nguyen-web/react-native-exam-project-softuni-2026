import { Alert, Image, ImageBackground, Keyboard, Linking, StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";
import { useSight } from "../context/useSight.js";
import { useAuth } from "../context/useAuth.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormSight } from "../validators/useFormSight.js";
import { globalColor, globalStyles } from "../globalStyles.js";
import { Feather, FontAwesome, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { getCurrentLocation } from "../services/locationService.js";
import Camera from "../components/Camera.jsx";
import Button from "../components/Button.jsx";
import FormWrap from "../components/FormWrap.jsx";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import DateInput from "../components/DateInput.jsx";
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import CountryFlag from "react-native-country-flag";

export default function FormSightScreen( {route, navigation}) {
    
    const {sight, isEdit,initialPhoto} = route.params;
    const [tempUri, setTempUri] = useState(initialPhoto || sight?.photo || null);
    const [saving, setSaving] = useState(false);

    const { createSight, updateSight } = useSight();
    const {user} = useAuth();
    const { control, errors, handleSubmit, setValue,reset, watch} = useFormSight({
        title: sight?.title || '',
        description: sight?.description || '',
        category: sight?.category || 'Nature',
        rating: sight?.rating || 0,
        country: sight?.country || '',
        city: sight?.city || '',
        street: sight?.street || '',
        region: sight?.region || '',
        isoCode: sight?.isoCode || '',
        location: sight?.location || '',
        lat: sight?.lat || null,
        lng: sight?.lng || null,
        liked: sight?.liked || false,
        startDate: sight?.startDate || new Date(),
        endDate: sight?.endDate || new Date(),
        // JS type date
        // startDate: sight?.startDate ? new Date(sight.startDate) : new Date(),
        // endDate: sight?.endDate ? new Date(sight.endDate) : new Date(),
        ownerId: user.id,
        author: user.username,
    });
    // watch will rerender when react-form-hook changes
    const lat = watch('lat');
    const lng = watch('lng');
    const location = watch('location')
    const isoCode = watch('isoCode');
    
    const makeUriUsable = async(tempUri) => {
        if(!tempUri) return null;

        const pickedImage = {
            canceled: false,
            assets: [{ uri: tempUri}],
        }
        return pickedImage.assets[0].uri;
    }
    
    const onError = () => {
        Keyboard.dismiss();
    }

    const onSubmit = async (data) => {
        Keyboard.dismiss();
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
                navigation.goBack()
            } else {
                result = await createSight(sightData)
                navigation.replace('Details', {id: result.id})
            }
        } finally {
            setSaving(false)
        }
    } 

    const handleCurrentLocation = async () => {
        
        const result = await getCurrentLocation();
        if(!result.success) {
            if (result.reason === 'serviceOff') {
                Alert.alert(
                    "Location is OFF",
                    "Turn ON location services in Settings",
                    [
                        { text: "Navigate from App to Location Service", onPress: () => Linking.openSettings() },
                        { text: "Dismiss"}
                    ]
                );
                return;
            }
            if(result.reason === "permissionDenied"){
               if(!result.canAskAgain) {
                    Alert.alert(
                        "Permission required",
                        "Enable location service from phone settings",
                        [
                            { text: "Open App Settings", onPress: ()=> Linking.openSettings()},
                            { text: "Dismiss" }
                        ]
                    );
                } else {
                    Alert.alert("Permission denied")
                }
                return; 
            }
        }

    reset({
        ...watch(),
        address: result.address,
        country: result.country,
        city: result.city,
        street: result.street,
        region: result.region,
        isoCode: result.isoCode,
        lat: result.latitude,
        lng: result.longitude, 
    })
        // setCoords({latitude: Number(result.latitude) , longitude: Number(result.longitude) })
        setValue('location', result.address, {shouldDirty: true});
        setValue('country', result.country, {shouldDirty: true});
        setValue('city', result.city, {shouldDirty: true});
        setValue('street', result.street, {shouldDirty: true});
        setValue('region', result.region, {shouldDirty: true});
        setValue('isoCode', result.isoCode, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue('lat', result.latitude, {shouldDirty: true});
        setValue('lng', result.longitude, {shouldDirty: true});
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
                            icon={isoCode? (<CountryFlag isoCode={isoCode} size={16}/>) : <Feather name="flag" size={20} color={globalColor.primary} />}
                            
                        /> 
                        <FormWrap
                            control={control}
                            name="location"
                            label="Location"
                            error={errors.location} 
                            placeholder=""
                            multiline = {true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            style={globalStyles.input}
                            icon={<FontAwesome6 name="map-location-dot" size={20} color={globalColor.primary} />}
                        />

                        {/* { coords && ( */}
                        { lat && lng && (
                            <MapView
                                style={{ height: 200, borderRadius: 11, marginTop: 8}}
                                region={{
                                    latitude: lat,
                                    longitude: lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: lat, longitude: lng }}
                                    title={location || "Selected Location"}
                                    description={location}
                                />
                            </MapView>
                        )}

                        {/* <MaterialIcons name="my-location" size={20} color={globalColor.primary} onPress={handleCurrentLocation} style={{marginLeft:8}} /> */}
                        <Button 
                            title="Use curent location" 
                            onPress={handleCurrentLocation} 
                            icon={<MaterialIcons name="my-location" size={20} color="white"/>}
                            />
                        <View style={[globalStyles.subtitle, {flexDirection: 'column',alignItems:"center",}]}>
                            <Text style={[globalStyles.subtitle, {fontSize: 18 }]}>
                                Best time to visit:
                            </Text>
                            
                            <View style={{flexDirection: "row", gap: 14}}>
                                <Controller
                                    control={control}
                                    name="startDate"
                                    error={errors.startDate}
                                    defaultValue={new Date()}
                                    render={({ field: { onChange, value } }) => (
                                        <DateInput value={value} onChange={onChange}/>
                                    )}
                                /> 
                                <Controller
                                    control={control}
                                    name="endDate"
                                    error={errors.endDate}
                                    // проверката дали е по-рано от началната дата е в schema
                                    defaultValue={new Date()}
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <DateInput value={value} onChange={onChange}/>
                                            {errors.endDate && (
                                                <Text style={{color: "#ff0000"}}>
                                                    {errors.endDate.message}
                                                </Text>
                                            )}
                                        </View>

                                    )}
                                />
                            </View>
                        </View>
                        <Controller
                            control={control}
                            name="category"
                            defaultValue="Nature"
                            render={({ field: { onChange, value } }) => (
                                <View style={{
                                    borderWidth: 1,
                                    borderBlockColor: globalColor.pink,
                                    borderRadius: 16,
                                    paddingHorizontal: 8,
                                    justifyContent: 'flex-start',
                                    overflow: 'hidden',
                                    height:160,
                                }}>
                                    <Text style={[globalStyles.subtitle, {fontSize: 20 }]}>
                                        Category
                                    </Text>

                                    <Picker
                                        selectedValue={value || "Nature"}
                                        onValueChange={onChange}
                                        style={{color:'#000'}}
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
                            
                        <Button
                            title={!isEdit ? 'Upload Sight' : 'Update sight'}
                            //todo icon
                            onPress={handleSubmit(onSubmit, onError)}
                            loading={saving}
                            disabled={saving}
                            style={styles.submitButton}
                            icon = {!isEdit ? <MaterialCommunityIcons name="upload" size={20} color="white" /> : <MaterialCommunityIcons name="text-box-edit-outline" size={20} color="white" />}
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