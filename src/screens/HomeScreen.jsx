import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    
    const [status, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState();

    if(!status) {
        return <ActivityIndicator />
    }

    if(status.granted) {
        return (
            <View>
                <Text>Application can not make photo of your sight without your permission camera to be used</Text>
                <Button
                    title="Grant Camera Permission"
                    onPress={requestPermission}
                />
            </View>
        )
    }
    return (
        <LinearGradient>
            <SafeAreaView>
                <ScrollView>
                    <Text>Share Your World</Text>
                    <Text>Every place has a story. Inspire others.</Text>
                    
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
        <View style={styles.container}>
            <Text>Photo your sights</Text>
            <Button 
                title="LaunchCamera"
                onPress={async () => {
                    const result = launchCameraAsync({ quality: 0.6})
                if(!result.canceled){
                    setPhoto(result.assets[0].uri)
                }
                }}
            />
            {photo && (
                <Image 
                source={{ uri: photo}}
                style={{ width: 300, height: 300, marginTop: 20}}
                />
            )}
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