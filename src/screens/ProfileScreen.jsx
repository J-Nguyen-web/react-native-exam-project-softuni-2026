import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text> Username </Text>
            </View>
            <Image />
            <View>
                <TouchableOpacity>Liked Sights</TouchableOpacity>
                <TouchableOpacity>Booked Sights</TouchableOpacity>
                <TouchableOpacity>Own Sights</TouchableOpacity>
            </View>
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