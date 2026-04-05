import { Image, ImageBackground, Keyboard, Linking, StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";
import { useSight } from "../context/useSight.js";
import { useAuth } from "../context/useAuth.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormSight } from "../validators/useFormSight.js";
import { globalColor, globalStyles } from "../globalStyles.js";
import { Feather, FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
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

export default function FormSightScreen( {route, navigation}) {
    
    // const [title, setTitle] = useState(sight?.title || '');
    // const [description, setDescription] = useState(sight?.description || '');
    // const [country, setCountry] = useState(sight?.country || '');
    // const [location, setLocation] = useState(sight?.location || '');
    const {sight, isEdit,initialPhoto} = route.params;
    const [tempUri, setTempUri] = useState(initialPhoto || sight?.photo || null);
    const [saving, setSaving] = useState(false);
    const [coords, setCoords] = useState(null);

    const { createSight, updateSight } = useSight();
    const {user} = useAuth();
    const { control, errors, handleSubmit, setValue, watch} = useFormSight({
        title: sight?.title || '',
        description: sight?.description || '',
        category: sight?.category || 'Nature',
        rating: sight?.rating || 0,
        country: sight?.country || '',
        isoCode: sight?.isoCode || '',
        location: sight?.location || '',
        lat: sight?.lat || null,
        lng: sight?.lng || null,
        liked: sight?.liked || false,
        startDate: sight?.startDate ? new Date(sight.startDate) : new Date(),
        endDate: sight?.endDate ? new Date(sight.endDate) : new Date(),
        ownerId: user.id,
        author: user.username,
    });
    // watch will rerender when react-form-hook changes
    const lat = watch('lat');
    const lng = watch('lng');
    const location = watch('location')
    

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
        console.log(user)
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
             if (!result.canAskAgain) {
                Alert.alert(
                    "Permission required",
                    "Enable location service from phone settings",
                    [
                        { text: "Open App Settings", onPress: ()=> Linking.openSettings()},
                        { text: "Dismiss" }
                    ]
                );
            }
            return;
        }
        setCoords({latitude: Number(result.latitude) , longitude: Number(result.longitude) })

        setValue('location', result.address,);
        setValue('country', result.country);
        setValue('isoCode', result.isoCode);
        setValue('lat', result.latitude);
        setValue('lng', result.longitude);
    }

    //TODO message when location service off
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

                        { coords && (
                            <MapView
                                style={{ height: 200, borderRadius: 11, marginTop: 8}}
                                initialRegion={{
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
                        <Button title="Use curent location" onPress={handleCurrentLocation} />
                        <View style={[globalStyles.subtitle, {flexDirection: 'column',alignItems:"center",}]}>
                            <Text style={[globalStyles.subtitle, {fontSize: 18 }]}>
                                Best time to visit:
                            </Text>
                            
                            <View style={{flexDirection: "row", gap: 14}}>
                                <Controller
                                    control={control}
                                    name="startDate"
                                    defaultValue={new Date()}
                                    render={({ field: { onChange, value } }) => (
                                        <DateInput value={value} onChange={onChange}/>
                                    )}
                                // />

                                // <Controller
                                //     control={control}
                                //     name="endDate"
                                //     defaultValue={new Date()}
                                //     render={({ field: { onChange, value } }) => (
                                //         <View style={{flex:1, alignItems: "center"}}>
                                //             <Text style={{color: globalColor.primary}}>End</Text>
                                //             <DateTimePicker
                                //                 value={value || new Date()}
                                //                 mode="date"
                                //                 display="compact"
                                //                 onChange={(event, date) => {
                                //                     if(date) {
                                //                         onChange(date)
                                //                     }
                                //                 }}
                                //             />
                                //         </View>
                                //     )}
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
                                    <Text style={[globalStyles.subtitle, {fontSize: 20 }]}>Category</Text>
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
                            onPress={handleSubmit(onSubmit, onError)}
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