import { Button, Image, Text, View } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { dummySights } from "../../db.js";

export default function SightDetailsScreen({route}) {

    const { id } = route.params;
    const sight = dummySights.find(item => item.id === id)

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