import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import { View } from "react-native/types_generated/index";
import { cardStyles } from "./cardStyles.js";

export default function Card({
  title,
  titleImage,
  rating,
  location,
}) {

  const navigation = useNavigation();

    return (
        <Pressable style={({pressed}) => [
          cardStyles.style,
          pressed && {opacity: 0.85},
        ]}
        onPress={() => navigation.navigate('SightDetails')}
        >
          <Image source={{ uri: titleImage }} style={cardStyles.image} />

          <View style={cardStyles.content}>
            <View style={cardStyle.titleRow}>
              <Text style={cardStyles.title}>{title}</Text>
              <Text style={cardStyles.rating}># {rating}</Text>
            </View>

            <Text style={cardStyles.location}> {location}</Text>
          </View>

        </Pressable>
    );
}