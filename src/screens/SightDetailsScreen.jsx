import { Button, Image, Text, View } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { dummySights } from "../../db.js";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { getById } from "../api/sights.js";

export default function SightDetailsScreen({route}) {
    
    const [sight, setSight] = useState();

    const { id } = route.params;

    setSight(dummySights.find(item => item.id === id));
    
    useEffect =( () => {
        getById(id)
        .then (res => {
            setSight(res.data)
        })
        .catch(err => {
            console.error('Error fetching sight')
        })
    
    },[id])

    return (
    <View style={cardStyles.style}>    
        <Image source={{ uri: sight.titleImage }} style={cardStyles.image} />
        <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
                <Text style={cardStyles.title}>{sight.title}</Text>
                <Text style={cardStyles.rating}># {sight.rating}</Text>
            </View>
    {/* todo add flags for country */}
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