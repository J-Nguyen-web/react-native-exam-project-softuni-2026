import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { dummySights } from "../../db.js";
import { useEffect, useState } from "react";
import { getById } from "../api/sights.js";
import CoutnryFlag from "react-native-country-flag"
import CountryFlag from "react-native-country-flag";

export default function SightDetailsScreen({route}) {
    
    const [sight, setSight] = useState();

    const { id } = route.params;

    // setSight(dummySights.find(item => item.id === id));
    
    useEffect ( () => {
        getById(id)
        .then (res => {
            setSight(res.data);
            console.log(res.data)
        })
        .catch(err => {
            console.error('Error fetching sight')
        })
    
    },[id]);

    if(!sight) {
        return <ActivityIndicator />
    }

    return (
    <View style={cardStyles.style}>    
        <Image source={{ uri: sight.titleImage }} style={cardStyles.image} />
        <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
                <Text style={cardStyles.title}>{sight.title}</Text>
                <Text style={cardStyles.rating}># {sight.rating}</Text>
            </View>
    {/* todo add flags for country */}
        <CountryFlag isoCode={sight.Country} size={20} />
            <Text style={cardStyles.location}>{sight.location} ({sight.country})</Text>
            <Text style={cardStyles.description}>{sight.description}</Text>
            <View>
                <Button title="Edit"></Button>
                <Button title="Delete"></Button>
                <Button title="Rate"></Button>
            </View>
        </View>
    </View>
    );
}