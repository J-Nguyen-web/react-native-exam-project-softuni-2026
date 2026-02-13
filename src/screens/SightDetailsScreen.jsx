import { Button, Image, Text } from "react-native";
import { cardStyles } from "../components/cardStyles.js";

export default function SightDetailsScreen({
    titleImage,
    title,
    rating,
    location,
    country,
    description,

}) {
    return (
    <View>    
        <Image source={{ uri: titleImage }} style={cardStyles.image} />
        <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
                <Text style={cardStyles.title}>{title}</Text>
                <Text style={cardStyles.rating}># {rating}</Text>
            </View>
    {/* todo add flags for country */}
            <Text style={cardStyles.location}>{location} ({country})</Text>
            <Text>{description}</Text>
            <View>
                <Button>Edit</Button>
                <Button>Delete</Button>
                <Button>Rate</Button>
            </View>
        </View>
    </View>
    );
}