import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { cardStyles } from "./cardStyles.js";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function Card({
  id,
  title,
  titleImage,
  photo,
  rating,
  country,
  location,
}) {

  const navigation = useNavigation();

    return (
        <Pressable style={({pressed}) => [
          cardStyles.style,
          pressed && {opacity: 0.55},
          ]}
          onPress={() => navigation.navigate('Details', {id: id})}
          >
          <Image source={{ uri: photo || titleImage }} style={cardStyles.image} resizeMode="cover" />
          {/* todo loading for photo */}

          <View style={cardStyles.content}>
            <View style={cardStyles.titleRow}>
              <Text style={cardStyles.title}>{title}</Text>
              {/* todo <Text style={cardStyles.rating}># {rating}</Text> */}
            </View>
              {/* todo add flags for country */}
              {/* todo location link to the place*/}
            <Text style={cardStyles.location}><Entypo name="location" size={18} color="#555555" />  {location} ({country})</Text>
          </View>

        </Pressable>
    );
}