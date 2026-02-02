import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { View } from "react-native/types_generated/index";
import { styles } from "../src/App.js";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});