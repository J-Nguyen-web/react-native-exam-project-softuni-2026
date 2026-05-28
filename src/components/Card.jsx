import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { cardStyles } from "./cardStyles.js";
import { Entypo, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalColor, globalStyles } from "../globalStyles.js";
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
  onPress
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
          { photo ? 
            (
                <Image source={{ uri: photo || titleImage }} style={cardStyles.image} resizeMode="cover" />
            ) : (<View style={globalStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColor.blue} />
                    <Text style={globalStyles.loadingText}>
                        Loading image...
                    </Text>
                </View>
            )}

            <View style={cardStyles.content}>
                <View style={cardStyles.titleColumn}>
                    <Text 
                        style={cardStyles.title}
                        ellipsizeMode="tail"
                        numberOfLines={3}
                        // elipsis може да се зададе тук със броя линии преди да се появи многоточие
                    >
                        {title}
                    </Text>

                    <View>
                        <StarsRating value={typeof ratingData?.average === "number" ? ratingData?.average?.toFixed(1) : "0"}/>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center' }} >
                        <Entypo name="location" size={18} color="#555555" />
                        <TouchableOpacity 
                    // всеки път се отваря нов search и се стакват с push or navigate - replace замества предxoдното
                            onPress={onPress}
                            activeOpacity={0.7}
                            style={globalStyles.ovalTag}                            
                            > 
                            {isoCode ? (<CountryFlag isoCode={isoCode} size={16}/>) : null} 
                            <Text
                                style={globalStyles.countryName}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {country}
                            </Text> 
                            <Text style={globalStyles.countryChevron}>›</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={cardStyles.authorColumn}>
                    {/* предаване на стойност към новия screen (чрез useRoute) в който initialQuery e името на ключа за стойност 
                    push вместо navigate осигурява fresh screen everytime когато се натиска различна стойност за търсене*/}
                    <Text style={{fontStyle:"italic"}}>
                        by: <Text style={{color: globalColor.turqouise}}>{author}</Text>
                    </Text>
                    <View>
                        
                    <MaterialIcons name="favorite-border" size={28} color="black" />
                    </View>
                </View>
            </View>
        </Pressable>
    );
}