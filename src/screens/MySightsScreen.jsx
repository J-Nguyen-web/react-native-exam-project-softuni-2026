import { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { globalColor, globalStyles } from "../globalStyles.js";
import { FlatList, Text, TouchableOpacity } from "react-native";
import Card from "../components/Card.jsx";
import { useAuth } from "../context/useAuth.js";
import { useSight } from "../context/useSight.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function MySightsScreen() {
    const { sights, reloadSights } = useSight();
    const navigation = useNavigation();
    const {user} = useAuth();

    const mySights = sights.filter(sight => sight.ownerId === user.id)
    console.log('Mys igte     ', mySights)

    useFocusEffect(
        useCallback(()=> {
            reloadSights()
        },[])
    )

    return (
        <LinearGradient colors={[globalColor.gradientPrimo, globalColor.gradientSecundo]} style={{flex:1 }}>
            <SafeAreaView style={{flex:1}}>
                {/* <Text style={globalStyles.title}>
                    My Sights
                </Text> */}
                <Text style={globalStyles.subtitle}>
                    Explore and manage your sights
                </Text>
            { mySights.length > 0 ? (
                <FlatList
                    data={mySights}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({index, item}) => <Card index={index} {...item}/>}
                    contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
                />
            ) : (
                <TouchableOpacity onPress={()=>navigation.navigate('HomeNavigator', {screen: 'Home'})}>
                    <Text style={globalStyles.subtitle}>
                        No sights created yet.</Text>
                    <Text style={[globalStyles.subtitle, {color: "#ff0000"}]}>
                        Visit home to get started - press here.</Text>
                </TouchableOpacity>
            )}
            </SafeAreaView> 
        </LinearGradient>   
    );
}