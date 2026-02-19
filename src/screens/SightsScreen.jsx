import { useEffect, useState } from "react";
import { getAll } from "../api/sights.js"
import { dummySights } from "../../db.js";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card.jsx";
import { StatusBar } from "expo-status-bar";

export default function SightScreen() {
  const [refresh, setRefresh] = useState(true)
  const [sights, setSights] = useState([])
  const [toggleRefreshing, setToggleRefreshing] = useState(false)

  useEffect( () => {
    async function fetchSights() {
      setRefresh(true)
      try {
        const sightsResult = await getAll();
        setSights(sightsResult.data);
      } catch (error) {
        alert('cannot load data')
      }
    }

    fetchSights();
  },[toggleRefreshing])
    return (
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