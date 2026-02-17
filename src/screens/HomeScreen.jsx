import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";

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