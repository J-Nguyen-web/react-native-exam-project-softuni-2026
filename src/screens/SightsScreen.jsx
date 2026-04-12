import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/Card.jsx";
import { useSight } from "../context/useSight.js";
import { LinearGradient } from "expo-linear-gradient";
import { globalColor, globalStyles } from "../globalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Camera from "../components/Camera.jsx";

export default function SightScreen() {
    const navigation = useNavigation();
    const {sights, loading, reloadSights} = useSight();
    // const [sights, setSights] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [photo, setPhoto] = useState(null)
    const [showCamera, setShowCamera] = useState(false)
    
    useEffect(() => {
        if(photo) {
            navigation.navigate('FormSight', {initialPhoto: photo})
            setPhoto(null);
            setShowCamera(false);
        }
    },[photo])

    const refreshHandler = async () => {
        setRefreshing(true)
        await reloadSights()
        setRefreshing(false)
    }

    const onScrollEndDrag = (event) => {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent

        const holdUpDistance = contentSize.height - (layoutMeasurement.height + contentOffset.y);

        

        if (holdUpDistance < -80) {
            setShowCamera(true)
        }
    }

    if(!sights) {
      return (
          <View style={globalStyles.loadingContainer}>
              <ActivityIndicator size="large" color={globalColor.blue} />
              <Text style={globalStyles.loadingText}>
                  Loading sights...  may take up to 50 seconds if the server is waking up
              </Text>
          </View>
      )
    }

    if (sights.length === 0) {
        return (
            <TouchableOpacity style={{flex:1, justifyContent: 'center'}} onPress={()=>navigation.navigate('HomeNavigator', {screen: 'Home'})}>
                <Text style={globalStyles.subtitle}>
                    No sights created yet.
                </Text>
                <Text style={[globalStyles.subtitle, {color: "#ff0000"}]}>
                    Visit home to get started - press here.
                </Text>
            </TouchableOpacity>
        )

    }
    return (
      <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={{flex: 1}}>
        <SafeAreaView style={{flex:1}} edges={['bottom', 'left', 'right']}>
          <View style={{padding: 8, flex: 1}}>
            <View style={{padding: 8,alignItems: 'center'}}>
                <Text style={{fontStyle: "italic", color: "#01b9a9"}}>
                  swipe down to refresh content
                </Text>
            </View>
            {loading ? (
              <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={globalColor.blue} />
                <Text style={globalStyles.loadingText}>
                    Loading sights... this may take up to 50 seconds if the server is waking up
                </Text>
              </View>
            ): ( <FlatList 
                data={sights || []}
                keyExtractor={(item, index) => item?.id ? String(item.id) : String(index)}
                renderItem={({item, index}) => <Card index={index} {...item} />}
                refreshing={refreshing}
                onRefresh={refreshHandler}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={20}
                ListFooterComponent={
                    <View style={{ padding: 25, alignItems: 'center'}}>
                        <Text style={globalStyles.loadingContainer}>
                            That are all sights...
                        </Text>
                        <Text style={globalStyles.subtitle}>
                            Hold up to create more by yourself ^_^
                        </Text>
                    </View>
                }
              />
              
              )}
              
              {showCamera && (
                <View style={{position: "absolute",bottom: 0, left: 0, right: 0, padding: 20}}>
                    <Camera onPhotoTaken={setPhoto} />
                    <TouchableOpacity onPress={() => setShowCamera(false)}>
                        <Text style={{color: "#ff0000", textAlign: 'center'}}>
                            Dismiss
                        </Text>
                    </TouchableOpacity>
                </View>
              )}
             
              {/* todo create sight on swipe Up - you want more? create one by yourself */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
}