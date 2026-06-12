import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { cardStyles } from "./cardStyles.js";
import { Entypo, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { globalColor, globalStyles } from "../globalStyles.js";
import { useRating } from "../context/useRating.js"
import { useLike } from "../context/LikesProvider.jsx";
import { useAuth } from "../context/useAuth.js";
import { useEffect } from "react";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
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

    const { user } = useAuth();
    const { ratingsMap } = useRating();
    const { likesMap, setLikesMap } = useLike();
    const navigation = useNavigation();
    const ratingData = ratingsMap?.[id] ?? null;
    const isLiked = !!likesMap[id]; // подобно на Boolean(likesMap[id]), ако е undefined, да върне false, а не error

    useEffect(() => {
        const loadLikes = async() => {
        const snapshot = await getDocs(
            collection(db, "users", user.id, "favorites")
        )

        const map = {};
        
        snapshot.forEach((doc) => {
            map[doc.id] = true;
        });
        setLikesMap(map)
    }
    loadLikes();

        async function checkIfLiked(params) {
            const likeRef = doc(db, 'users', user.id, 'favorites', id)
            
            const snapshot = await getDoc(likeRef);
            
            setIsLiked(snapshot.exists())
        }
        checkIfLiked();
    })

    const handleHeartButton = async(id)=> {
        if (!user) return;
        await likeSight(id);
    }

    const handleUnheartButton = async (id)=> {
        await unlikeSight(id)
    }

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
                    { isLiked ? (
                        <Pressable style={{padding:20}} onPress={(event)=> {
                            event.stopPropagation() // за да няма conflict между Preasuble тук и за самата card
                            handleUnheartButton()
                        }}>
                            <MaterialCommunityIcons name="cards-heart" size={29} color="#d45151" />
                        </Pressable>                        
                    ): (
                        <Pressable style={{padding:20}}  onPress={(event)=> {
                            event.stopPropagation()
                            handleHeartButton()
                        }}>
                            <MaterialCommunityIcons name="cards-heart-outline" size={29} color="#898888" />
                        </Pressable>                          
                    )}

                </View>
            </View>
        </Pressable>
    );
}