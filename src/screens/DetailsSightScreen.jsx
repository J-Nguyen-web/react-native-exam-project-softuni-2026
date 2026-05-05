import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSight } from "../context/useSight.js";
import { useAuth } from "../context/useAuth.js";
import { formatDate } from "../util/formatDate.js";
import { globalColor, globalStyles } from "../globalStyles.js";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { useRating } from "../context/useRating.js";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import Button from "../components/Button.jsx";
import StarsRating from "../components/StarsRating.jsx";
import * as ratingService from "../services/ratingService.js"
import CountryFlag from "react-native-country-flag";
import { sightService } from "../services/index.js";

export default function DetailsSightScreen({route}) {
    
    const [sight, setSight] = useState(null);
    const [userRating, setUserRating] = useState(null);

    const { id: id } = route.params;
    const navigation = useNavigation();
    const {user} = useAuth();
    const { loading, getSightById, deleteSight } = useSight();
    const { ratingsMap, loadRatings } = useRating();

    const sightRating = sight?.id ? ratingsMap?.[sight?.id] : null;

    let isOwner = sight?.ownerId === user?.id

    useEffect(() => {

        const loadSight = async () => { 
            const sightData = await sightService.getById(id)
            setSight(sightData)
            console.log(sight)
        };
        loadSight();

        async function loadUserRating() {
            try {
                const rating = await ratingService.getUserRating(sight?.id, user?.id)
                setUserRating(rating || null)
            } catch (error) {
                setUserRating(null)
            }
        }

        loadUserRating();
    },[id]);

    useFocusEffect(
        
        useCallback(() => {
            getSightById(id)
            .then (res => { setSight(res); })
            .catch(err => {
            console.error('Error fetching sight', err)
        })
        },[id])
        
    )

    if(!sight) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={globalColor.blue} />
                <Text style={globalStyles.loadingText}>
                    Loading sight...  may take up to 50 seconds if the server is waking up
                </Text>
            </View>
        )
    }

    const swipeBack = Gesture.Pan()
            .activeOffsetX(50)
            .activeOffsetY([-20,20])
            .onEnd((event) => {
                if(event.translationX > 120 ){
                    navigation.goBack();
                }                
            })

    async function handleRating(value) {
        let updated;

        if(userRating && userRating.id){
            updated = await ratingService.updateRating (userRating.id, {...userRating, rating: value})
        } else {
            updated = await ratingService.createRating({
                sightId: sight.id,
                userId: user.id,
                rating: value
            })
        }
        
        setUserRating(updated)
        loadRatings();
    }

    async function handleDeleteSight() {
        try {
            Alert.alert(
                "Delete SIght",
                `Confirm delete sight: ${sight.title} ?`,
                [
                    { text: "Dismiss", style: "cancel"},
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () =>{
                            await deleteSight(id);
                            navigation.goBack();
                        }
                    }
                ]
            )
        } catch (error) {
            console.error(`Failed to delete sight: ${sight.title}`)
        }
    }

    return (
        
        <ScreenWrapper>
            <GestureDetector gesture={swipeBack}>
                <View style={[cardStyles.style]}>
                    <Image source={{ uri: sight.photo || sight.titleImage }} style={cardStyles.image} />
                    <View style={cardStyles.content}>
                        <Text style={cardStyles.title}>{sight?.title}</Text>
                        <Text style={cardStyles.author}>
                            Author: <Text style={{color: globalColor.turqouise}}>{sight.author}</Text>
                        </Text>
                        <Text>Rating - {sightRating ? sightRating?.average.toFixed(1) : 'No rating yet'}</Text>
                        <View>{sightRating ? <StarsRating value={sightRating?.average || 0} readonly/> : null}</View>
                        {!isOwner && (
                            <View>
                                <Text>Your rating</Text>
                                <StarsRating value={userRating?.rating || 0} onChange={handleRating}/>
                            </View>
                        )}

                        <Text style={{ justifyContent: 'center'}}>
                            Country: <CountryFlag isoCode={sight?.isoCode} size={16}/> {sight?.country}
                        </Text>
                        <Text>
                            Location description:
                        </Text>
                        <Text 
                            style={[
                                cardStyles.location, {
                                    borderBottomColor: "#555555", 
                                    borderBottomWidth: 1, 
                                    borderStyle: "solid", 
                                    paddingBottom: 14,
                                }]}>
                                    {sight?.location}
                        </Text>
                        <Text style={cardStyles.description}>{sight?.description}</Text>

                        {/* TODO link to all the sights with same category */}
                        <Text style={[cardStyles.description, {fontStyle:'italic'}]}><Text style={{color: globalColor.turqouise}}>Category:  </Text> {sight?.category}</Text>
                        
                        <View style={{ flexDirection: 'column', alignItems: 'baseline'}}>
                            <Text style={[cardStyles.description, {color: globalColor.turqouise , marginBottom:0}]}>
                                Best time to visit:
                            </Text>
                            <Text style={[cardStyles.description, {fontStyle: 'italic', marginTop:0}]}>around {formatDate(sight?.startDate) }</Text>
                        </View>
                        
                        
                        {/* TODO until period of time */}
                        {/* <Text style={cardStyles.description}>{formatDate(sight?.endDate)}</Text> */}

                            { sight?.defaultSight &&   (
                                <Text style={[globalStyles.subtitle, {color: '#ff0000'}]} onPress={()=>navigation.navigate('Tabs', {screen: 'Home'})}>
                                    For edit and delete functionality, create your own sight from home screen - here
                                </Text>
                            )}
                        { isOwner && (<View style={{flexDirection: "row", justifyContent: "flex-end", gap: 8}}>
                            <Button 
                                title="Edit"
                                onPress={() => navigation.navigate('FormSight',{
                                    sight: sight,
                                    isEdit: true
                                })}
                                style={styles.edit}
                                />
                            <Button 
                                title="Delete"
                                onPress={(handleDeleteSight)}
                                style={styles.delete}
                                />
                            {/* <Button title="Rate"></Button> */}
                        </View>)} 
                </View>
            </View>
        </GestureDetector>
    </ScreenWrapper>
    );
}

export const styles = StyleSheet.create({
    edit: {
        backgroundColor: "#fbf300",
        color: "#000"
    },
    delete: {
        backgroundColor: "#ff0000",
        color: "#ffffff"
    }
})