import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { cardStyles } from "./cardStyles.js";

export default function Card({
  id,
  title,
  titleImage,
  rating,
  country,
  location,
}) {

  const navigation = useNavigation();

    return (
        <Pressable style={({pressed}) => [
          cardStyles.style,
          pressed && {opacity: 0.85},
        ]}
        onPress={() => navigation.navigate('SightDetails', {id: id})}
        >
          <Image source={{ uri: titleImage }} style={cardStyles.image} />

          <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
              <Text style={cardStyles.title}>{title}</Text>
              <Text style={cardStyles.rating}># {rating}</Text>
            </View>
{/* todo add flags for country */}
            <Text style={cardStyles.location}>{location} ({country})</Text>
          </View>

        </Pressable>
    );
}