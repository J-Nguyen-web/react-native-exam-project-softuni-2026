import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/Card.jsx";
import { useSight } from "../context/useSight.js";
import { LinearGradient } from "expo-linear-gradient";
import { globalColor, globalStyles } from "../globalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function SightScreen() {
    const {sights, loading, reloadSights} = useSight();
    // const [sights, setSights] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const refreshHandler = async () => {
        setRefreshing(true)
        await reloadSights()
        setRefreshing(false)
    }

    const navigation = useNavigation();

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

    if (!sights.length > 0) {
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
                keyExtractor={(item) => item.id.toString() || Math.random().toString()}
                renderItem={({item, index}) => <Card index={index} {...item} />}
                refreshing={refreshing}
                onRefresh={refreshHandler}
              />)}
             
              {/* todo create sight on swipe Up - you want more? create one by yourself */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
}

export const style = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: 'center',
    color: globalColor.blue,
    marginBottom: 25,
    paddingBottom: 11,
    width: '90%',

    borderBottomWidth: 3,
    borderBottomColor: '#d0cccc'

  },
  titleContainer: {
    padding: 8,
    alignItems: 'center',
  },
})