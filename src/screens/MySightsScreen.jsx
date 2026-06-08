import { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { globalColor, globalStyles } from "../globalStyles.js";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/Card.jsx";
import { useAuth } from "../context/useAuth.js";
import { useSight } from "../context/useSight.js";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { getAllRatings, getUserRating } from "../services/ratingService.js";

export default function MySightsScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const { type, title } = route.params;
    const { sights, reloadSights } = useSight();
    const { user } = useAuth();

    const [ favoriteSightsId, setFavoriteSightsId ] = useState([]);
    const [userRatedSightsId, setUserRatedSightsId] = useState([])

    const filters = {
        created: sight => sight.ownerId === user.id,
        favorite: sight => favoriteSightsId?.includes(sight.id),
        rated: sight => userRatedSightsId?.includes(sight.id),
    };

    const filteredSights = sights.filter(filters[type])

    useEffect(()=> {
        async function loadRatedSights() {
            // const ratings = await getAllRatings();
            // const userRated = ratings.filter( ratedSights => ratedSights.userId === user.id)
            // const userRatedSights = userRated.map( rated => rated.sightId)
            // const ratedSights = sights.filter( sight => userRatedSights.includes(sight.id))

            try {
                // all lines in one
                const ratedSightsId = (await getAllRatings()).filter(rates => rates.userId === user.id).map( rate => rate.sightId);
                setUserRatedSightsId(ratedSightsId)
                const ratings = await getAllRatings();
            } catch (error) {
                console.log(error)
            }
        }
        loadRatedSights();

        async function loadUserFavorites() {
            try {
                const favoriteRef = await collection(db, 'users', user.id, 'favorites');
                const snap = await getDocs(favoriteRef);
                setFavoriteSightsId (snap.docs.map(doc => doc.id))
                console.log(favoriteSightsId)
            } catch (error) {
                console.log(error)
            }
        }
        loadUserFavorites();
    },[])

    useFocusEffect(
        useCallback(()=> {
            reloadSights()
        },[])
    )

    const swipeBack = Gesture.Pan()
            .activeOffsetX(50)
            .activeOffsetY([-20,20])
            .onEnd((event) => {
                if(event.translationX > 120 ){
                    navigation.goBack();
                }                
            })

    return (
        <LinearGradient colors={[globalColor.gradientPrimo, globalColor.gradientSecundo]} style={{flex:1 }}>
            <GestureDetector gesture={swipeBack}>
                <View style={{flex:1}}>
                    <SafeAreaView style={{flex:1}}>
                        <Text style={globalStyles.subtitle}>
                            Explore and manage your sights
                        </Text>

                        { filteredSights.length > 0 ? (
                        <FlatList
                            data={filteredSights}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({index, item}) => <Card index={index} {...item}/>}
                            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
                        />
                        ) : (
                            <TouchableOpacity onPress={()=>navigation.navigate('HomeNavigator', {screen: 'Home'})}>
                                <Text style={globalStyles.subtitle}>
                                    No sights created yet.
                                </Text>
                                <Text style={[globalStyles.subtitle, {color: "#ff0000"}]}>
                                    Visit home to get started - press here.
                                </Text>
                            </TouchableOpacity>
                        )}
                    </SafeAreaView>
                </View> 
            </GestureDetector>
        </LinearGradient>
           
    );
}