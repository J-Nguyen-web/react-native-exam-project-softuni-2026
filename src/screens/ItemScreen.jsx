import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

export default function ItemScreen() {
    return (
        <View style={styles.container}>
            <Text>Item Screen</Text>
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