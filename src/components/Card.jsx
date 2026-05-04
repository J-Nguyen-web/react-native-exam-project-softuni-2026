import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { cardStyles } from "./cardStyles.js";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { globalColor } from "../globalStyles.js";
import { useRating } from "../context/useRating.js"
import CountryFlag from "react-native-country-flag";
import StarsRating from "./StarsRating.jsx";

export default function Card({
  id,
  title,
  titleImage,
  photo,
  rating,
  country,
  city,
  street,
  region,
  isoCode,
  location,
  author,
}) {

  const navigation = useNavigation();
  const { ratingsMap } = useRating();
  const ratingData = ratingsMap?.[id] ?? null;

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
                    <Text style={cardStyles.title}>
                        {title}
                    </Text>
                    <Text style={cardStyles.rating}>
                        {typeof ratingData?.average === "number" ? ratingData?.average?.toFixed(1) : "0"}
                    </Text>
                    <Text style={{fontStyle:"italic"}}>
                        Author: <Text style={{color: globalColor.turqouise}}>{author}</Text>
                    </Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {/* предаване на стойност към новия screen (чрез useRoute) в който initialQuery e името на ключа за стойност 
                    push вместо navigate осигурява fresh screen everytime когато се натиска различна стойност за търсене*/}
                    <View 
                        onPress={() => navigation.push('Search', {initialQuery: country})}
                        style={{flex: 1, flexDirection: "row", alignItems: 'center', gap: 8}}
                    >
                        <Entypo name="location" size={18} color="#555555" /> ({isoCode ? <CountryFlag isoCode={isoCode} size={16}/> : null} <Text style={{fontStyle: 'italic', fontSize: 15}}>{country}</Text> )
                        {/* {location} whole location will be shown on details */}
                    </View>

                    <View>
                        <StarsRating value={typeof ratingData?.average === "number" ? ratingData?.average?.toFixed(1) : "0"}/>
                    </View>
                </View>

            </View>

        </Pressable>
    );
}