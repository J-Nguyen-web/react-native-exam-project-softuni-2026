import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card.jsx";
import { StatusBar } from "expo-status-bar";
import { sightService } from "../services/index.js";
import { useSight } from "../context/useSight.js";
import { LinearGradient } from "expo-linear-gradient";

export default function SightScreen() {
  const {sights, reloadSights} = useSight();
  // const [sights, setSights] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = async () => {
    setRefreshing(true)
    await reloadSights()
    setRefreshing(false)
  }
    return (
      <LinearGradient colors={["#ffffff", "#ddd6fe"]} style={{flex: 1}}>      
        <View style={style.container}>
          {/* <View style={style.titleContainer}> <Text>swipe down to refresh the list of sights</Text> </View> */}
            <FlatList 
            data={sights}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index}) => <Card index={index} {...item} />}
            refreshing={refreshing}
            onRefresh={refreshHandler}
            />

          <StatusBar style="dark" />
        </View>
      </LinearGradient>
    );
}

export const style = StyleSheet.create({
  gradient: {flex: 1},
  container: {
    paddingTop: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: 'center',
    color: "#0077b6",
    marginBottom: 25,
    paddingBottom: 11,
    width: '90%',

    borderBottomWidth: 3,
    borderBottomColor: '#d0cccc'

  },
  titleContainer: {
    alignItems: 'center',
  },
  
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
})