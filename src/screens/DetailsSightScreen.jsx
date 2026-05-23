import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { cardStyles } from "../components/cardStyles.js";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSight } from "../context/useSight.js";
import { useAuth } from "../context/useAuth.js";
import { formatDate } from "../util/formatDate.js";
import { globalColor, globalStyles } from "../globalStyles.js";
import { GestureDetector, Gesture, Directions,  } from "react-native-gesture-handler";
import { useRating } from "../context/useRating.js";
import { sightService } from "../services/index.js";
import { Feather } from "@expo/vector-icons";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import Button from "../components/Button.jsx";
import StarsRating from "../components/StarsRating.jsx";
import * as ratingService from "../services/ratingService.js"
import CountryFlag from "react-native-country-flag";
import commentService from "../services/commentService.js";
// import filter from "../util/profanityFilter.js";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import CommentCard from "../components/CommentCard.jsx";

export default function DetailsSightScreen({route}) {
    
    const [sight, setSight] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [comment,setComment] = useState('')
    const [comments,setComments] = useState([])
    const [editedCommentId, setEditedCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('')

    const { id: id } = route.params;
    const { user } = useAuth();
    const { loading, getSightById, deleteSight } = useSight();
    const { ratingsMap, loadRatings } = useRating();
    const navigation = useNavigation();

    const sightRating = sight?.id ? ratingsMap?.[sight?.id] : null;

    let isOwner = sight?.ownerId === user?.id

    useEffect(() => {
        const loadSight = async () => { 
            const sightData = await sightService.getById(id)
            setSight(sightData)
        };
        loadSight();

        async function loadUserRating() {
            try {
                const rating = await ratingService.getUserRating(sight?.id, user?.id)
                setUserRating(rating || null)
            } catch (error) {
                setUserRating(null)
            }
        }
        loadUserRating();

        // const loadComments = async() => { // manual loading of comments, no needed bcoz we use unsubscribe listener
        //     const result = await commentService.getBySightId(id);
        //     setComments(result);} loadComments();

        // зачистваща функция, която стопира слушането на промени при влизане в тази секция, по този начин, няма да се стартира отново
        // и отново всеки път щом се отвори даден екран и да се натрупват процеси на eventListeners
        const unsubscribe = commentService.subscribeToComments(id, setComments); 
        // setComments е се приема като callback от commentService и се зарежда с коментарите от там
        return () => unsubscribe()
        
    },[id]);

    useFocusEffect(
        useCallback(() => {
            getSightById(id)
            .then (res => { setSight(res); })
            .catch(err => {
            console.error('Error fetching sight', err)
        })
        },[id])
    )

    if(!sight) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={globalColor.blue} />
                <Text style={globalStyles.loadingText}>
                    Loading sight...  may take up to 50 seconds if the server is waking up
                </Text>
            </View>
        )
    }

    const addCommentHandler = async()=> {
        try {
            if(!comment.trim()) return;

            // if(filter.isProfane(comment)) {
            //     Alert.alert(
            //         'Invalid Comment',
            //         'Please avoid offensive language.'
            //     )
                
            //     return;
            // }

            const newComment = {
                text: comment,
                sightId: id,
                ownerId: user.id, // firebase id
                username: user.username,
                // avatar: user.photoUrl || null // todo users photo 
            };

            await commentService.create(newComment)
            setComment('');

            // const updateComments = await commentService.getBySightId(id); // manual update, no longer needed bcoz we use onSnapshot
            // setComments(updateComments)

        } catch (error) {
            console.log(error)
        }
    };

    const handleOnEditComment = async(item) => {
        setEditedCommentId(item.id)
        setEditedComment(item.text)
    }

    const handleSaveEdit = async(editedCommentId) => {
        
        try {
                    await commentService.update(editedCommentId, editedComment)

        setEditedCommentId(null);
        setEditedComment('');
        } catch (error) {
            console.log(error)
        }

        }

    const handleOnDeleteComment = async(item) => {
        await commentService.remove(item.id)
    }

    const swipeBack = Gesture.Pan()
            .activeOffsetX(50)
            .activeOffsetY([-20,20])
            .onEnd((event) => {
                if(event.translationX > 120 ){
                    navigation.goBack();
                }                
            })

    async function handleRating(value) {
        let updated;

        if(userRating && userRating.id){
            updated = await ratingService.updateRating (userRating.id, {...userRating, rating: value})
        } else {
            updated = await ratingService.createRating({
                sightId: sight.id,
                userId: user.id,
                rating: value
            })
        }
        
        setUserRating(updated)
        loadRatings();
    }

        // TODO - edit sight via firebase

    async function handleDeleteSight() {
        try {
            Alert.alert(
                "Delete SIght",
                `Confirm delete sight: ${sight.title} ?`,
                [
                    { text: "Dismiss", style: "cancel"},
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () =>{
                            await deleteSight(id);
                            navigation.goBack();
                        }
                    }
                ]
            )
        } catch (error) {
            console.error(`Failed to delete sight: ${sight.title}`)
        }
    }

    function Divider() {
        return <View style={globalStyles.divider} />
    }

    return (
        <LinearGradient 
            colors={[globalColor.gradientPrimo, 
            globalColor.gradientSecundo]} 
            style={[globalStyles.gradient]}
        >
            <SafeAreaView style={{flex:1}}>
            <GestureDetector gesture={swipeBack}>
                <FlatList
                    data={comments}
                    renderItem={({item, index}) =>
                                 <CommentCard 
                                    index={index} 
                                    item={item}
                                    isEditing={editedCommentId === item.id}
                                    editedComment={editedComment}
                                    setEditedComment={setEditedComment}
                                    onEdit={() => handleOnEditComment(item)}
                                    onSave={() => handleSaveEdit(item.id)}
                                    onCancel={() => {
                                        setEditedComment('');
                                        setEditedCommentId(null);
                                    }}
                                    onDelete={() => handleOnDeleteComment(item.id)}
                                     />
                                }
                    contentContainerStyle={{ paddingBottom: 140 }}
                    keyboardShouldPersistTaps="handled"

                    ListHeaderComponent={(
                        <>
                        <View style={[cardStyles.style]}>
                            { sight.photo || sight.titleImage ? 
                                (
                                    <Image source={{ uri: sight.photo || sight.titleImage }} style={cardStyles.image} />
                                ) : (<View style={globalStyles.loadingContainer}>
                                        <ActivityIndicator size="large" color={globalColor.blue} />
                                        <Text style={globalStyles.loadingText}>
                                            Loading image...
                                        </Text>
                                    </View>
                                )}
                            
                            {/* // === CONTENT === // */}
                            <View style={globalStyles.content}>

                                {/* // === TITLE === // */}
                                <View style={globalStyles.section}>
                                    <Text style={cardStyles.title}>{sight?.title}</Text>
                                    
                                    <View style={globalStyles.authorRow}>
                                        {/* <Feather name="user" size={18} color={globalColor.turqouise} style={globalStyles.authorAvatar}/> */}
                                        <Text style={globalStyles.authorText}>
                                            by:{"  "} 
                                            <Text style={[globalStyles.authorName,{color: globalColor.turqouise}]}>
                                                {sight.author}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                            <Divider />

                                {/* // === RATING === // */}
                                <View style={globalStyles.section}>
                                    <Text style={globalStyles.ratingCount}>Rating - {sightRating ? sightRating?.average.toFixed(1) : 'No rating yet'}</Text>
                                    <View>{sightRating ? <StarsRating value={sightRating?.average || 0} readonly/> : null}</View>
                                    {!isOwner && (
                                        <View style={globalStyles.section}>
                                            <Text style={globalStyles.label}>Your rating</Text>
                                            <View style={globalStyles.ratingBox}>
                                                <Text style={globalStyles.ratingValue}>
                                                    {sightRating ? sightRating.average.toFixed(1) :"-"}
                                                </Text>
                                                <StarsRating value={userRating?.rating || 0} onChange={handleRating}/>
                                            </View>
                                        </View>
                                    )}
                                </View>

                            <Divider />

                                {/* // === Country === // */}
                                <View style={globalStyles.section}>
                                    <View style={globalStyles.countryRow}>
                                        <Text style={globalStyles.countryLabel}>Country:</Text>
                                        <TouchableOpacity 
                                            onPress={() => navigation.push('Search', {initialQuery: sight?.country})}
                                            activeOpacity={0.7}
                                            style={globalStyles.ovalTag}
                                            >
                                            <CountryFlag isoCode={sight?.isoCode} size={16}/>
                                            <Text style={globalStyles.countryName}>{sight?.country}</Text>
                                            <Text style={globalStyles.countryChevron}>›</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View style={globalStyles.section}>
                                    <Text style={globalStyles.label}>
                                        Location description:
                                    </Text>
                                    <Text style={globalStyles.contentText}>
                                        {sight?.location}
                                    </Text>
                                </View>

                                <Divider />

                                {/* // === DESCRIPTION === // */}
                                <View style={globalStyles.section}>
                                    <Text style={globalStyles.label}>About this Sight:</Text>
                                    <View>
                                        <Text style={globalStyles.contentText}>{sight?.description}</Text>
                                    </View>
                                </View>

                                <Divider />

                                {/* // === CATEGORY === // */}
                                <View style={globalStyles.section}>
                                    <View style={globalStyles.countryRow}>
                                            <Text style={globalStyles.label}>
                                                Category:
                                            </Text>
                                            <TouchableOpacity 
                                                onPress={() => navigation.push('Search', {initialQuery: sight?.category})}
                                                activeOpacity={0.7}
                                                style={globalStyles.ovalTag}
                                            >
                                                <Text style={[globalStyles.contentText, {fontStyle:'italic'}]}>
                                                    {sight?.category}
                                                </Text>
                                            <Text style={globalStyles.countryChevron}>›</Text>
                                        </TouchableOpacity>     
                                    </View>
                                </View>

                                <Divider />

                                {/* // === BEST TIME === // */}
                                <View style={globalStyles.section}>
                                    <Text style={globalStyles.label}>Best time to visit</Text>
                                    <View style={globalStyles.highlight}>
                                        <Text style={globalStyles.contentText}>
                                            <Text style={{color: globalColor.turqouise}}>
                                                from
                                            </Text>
                                            {" "} {formatDate(sight?.startDate)}
                                        </Text>
                                        <Text style={globalStyles.contentText}>
                                            <Text style={{color: globalColor.turqouise}}>
                                                until
                                            </Text>
                                            {" "} {formatDate(sight?.endDate)}
                                        </Text>
                                    </View>
                                </View>
                                
                                <Divider />

                                    { sight?.defaultSight &&   (
                                        <Text style={[globalStyles.subtitle, {color: '#ff0000'}]} onPress={()=>navigation.navigate('Tabs', {screen: 'Home'})}>
                                            For edit and delete functionality, create your own sight from home screen - here
                                        </Text>
                                    )}
                                { isOwner && (
                                <View style={{flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 8}}>
                                    <Button 
                                        title="Edit"
                                        onPress={() => navigation.navigate('FormSight',{
                                            sight: sight,
                                            isEdit: true
                                        })}
                                        style={[globalStyles.edit , {padding: 0}]}
                                        />
                                    <Button 
                                        title="Delete"
                                        onPress={(handleDeleteSight)}
                                        style={globalStyles.delete}
                                        />
                                </View>)} 
                            </View>
                        </View>

                        <View style={styles.commentSection}>
                            <Text style={styles.commentTitle}>
                                Comments
                            </Text>

                            <View style={styles.commentInputContainer}>
                                <TextInput
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholder="Your comment..."
                                    style={styles.commentInput}
                                />
                                <TouchableOpacity style={styles.postButton} onPress={addCommentHandler}>
                                    <Text style={styles.postButtonText}>
                                        Post
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </>
                    )}
                />
            </GestureDetector>
        </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

  commentSection: {
    marginTop: 28,
    marginHorizontal: 14, 
    marginBottom: 14,
  },

  commentTitle: {
    fontSize: 22,
    fontWeight:"800",
    color: globalColor.primary,
    marginBottom: 16
  },
  
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },

  commentInput: {
    flex: 1,
    backgroundColor: 'white',

    borderWidth: 1.5,
    borderColor: globalColor.primary,
    borderRadius: 18,

    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 3,

    elevation: 6,

    paddingHorizontal: 16,
    paddingVertical: 14,

    fontSize: 14,
    color: globalColor.primary,
  },

  commentText: {
    color: '#555',
    lineHeight: 22,
    fontSize:14,

    marginHorizontal: 18,
    marginVertical: 3,
  },

  postButton: {
    backgroundColor: globalColor.turqouise,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 3,

    elevation: 6,
  },
  postButtonText: {
    color: "#fff",
    fontWeight:"700",
  },
})