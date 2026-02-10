import { useEffect, useState } from "react";
import { getAll } from "../api/sights.js"
import { dummySights } from "../../db.js";
import { ScrollView, StyleSheet } from "react-native";
import Card from "../components/Card.jsx";

export default function SightScreen() {
  const [refresh, setRefresh] = useState(true)
  const [sights, setSights] = useState([])
  const [toggleRefreshing, setToggleRefreshing] = useState(false)

  useEffect( () => {
    async function fetchSights() {
      setRefresh(true)
      try {
        // const sightsResult = await getAll();
        setSights(dummySights);
      } catch (error) {
        alert('cannot load data')
      }
    }

    fetchSights();
  },[toggleRefreshing])
    return (
        <View style={style.container}>
          <Text style={style.title}> Discover Sights </Text>

            <ScrollView contentContainerStyle={style.scrolContent}>
              {sights.map((sight) => (
                <Card key={sight.id} {...sight} />
              ))}
            </ScrollView>
          <statusBar style="dark" />
        </View>
    );
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffff',
    paddingtop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
})