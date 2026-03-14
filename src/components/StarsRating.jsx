import { Pressable, Text, View } from "react-native";

export default function StarsRating({ value = 0, onChange}) {
    return (
        <View style={{ flexDirection: "row", marginVertical: 8 }}>
            {[1,2,3,4,5].map((star) => (
            <Pressable key={star} onPress={() => onChange(star)}>
                <Text style={{ fontSize: 30 , color: star <= value? "#ffd700" : "#b6b3b3ba"}}>
                    {star <= value ? "★" : "☆"}
                </Text>
            </Pressable>
            ))}
        </View>
    );
}