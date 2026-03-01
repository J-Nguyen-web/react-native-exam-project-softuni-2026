import { useEffect, useState } from "react";
import { dummySights } from "../../db.js";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card.jsx";
import { StatusBar } from "expo-status-bar";
import { sightService } from "../services/index.js";
import { useScreenLoaderRefresh } from "../hooks/useScreenLoaderRefresh.js";
import { RefreshableScreen } from "../components/RefreshableScreen.jsx";

export default function SightScreen() {
  const [sights, setSights] = useState([])

  // за да се използва и от useEffect и RefreshScreen-a
  async function fetchSights() {
    try {
      const sightsResult = await sightService.getAll();
      setSights(sightsResult);
    } catch (error) {
      alert('cannot load data')
    }
  }

  const { loading, reload } = useScreenLoaderRefresh(fetchSights)
    return (
        <RefreshableScreen loading={loading} reload={reload}>
        <View style={style.container}>
          <View style={style.titleContainer}>
          </View>
          

            {/* <ScrollView scrollContent={style.scrollContent}>
              {sights.map((sight) => (
                <Card key={sight.id} {...sight} />
              ))}
            </ScrollView> */}

            <FlatList 
            data={sights}
            renderItem={({item, index}) => <Card index={index} {...item} />}
            keyExtractor={(item) => item.id.toString()}
            />

          <StatusBar style="dark" />
        </View>
        </RefreshableScreen>
    );
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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