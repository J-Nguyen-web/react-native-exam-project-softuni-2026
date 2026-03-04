import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { useEffect, useState } from "react";
import CountryFlag from "react-native-country-flag";
import { sightService } from "../services/index.js";
import { useNavigation } from "@react-navigation/native";

export default function DetailsSightScreen({route}) {
    
    const [sight, setSight] = useState();

    const { id: id } = route.params;
    const navigation = useNavigation();

    
    useEffect ( () => {
        sightService.getById(id)
        
        .then (res => { setSight(res); })
        .catch(err => {
            console.error('Error fetching sight', err)
        })
    
    },[id]);

    if(!sight) {
        return <ActivityIndicator />
    }

    return (
    <View style={cardStyles.style}>    
        <Image source={{ uri: sight.photo || sight.titleImage }} style={cardStyles.image} />
        <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
                <Text style={cardStyles.title}>{sight?.title}</Text>
                <Text style={cardStyles.rating}># {sight?.rating}</Text>
            </View>
    {/* todo add flags for country */}
        {/* <CountryFlag isoCode={sight.Country} size={20} /> */}
            <Text style={cardStyles.location}>{sight?.location} ({sight?.country})</Text>
            <Text style={cardStyles.description}>{sight?.description}</Text>
            <View>
                <Button 
                    title="Edit"
                    onPress={() => navigation.navigate('FormSight',{
                        sight: sight,
                        isEdit: true
                    })}
                    />
                <Button title="Delete"></Button>
                <Button title="Rate"></Button>
            </View>
        </View>
    </View>
    );
}