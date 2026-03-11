import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera({
    onPhotoTaken,
    retake
}) {
    const [status, requestPermission] = useCameraPermissions();

    if(!status) {
        return <ActivityIndicator />
    }

    if(!status.granted) {
        return (
            <View style={{ flexDirection: "column", alignItems: "center"}}>
                <Text style={styles.permissionTitle}>Enable Camera</Text>
                <Text style={styles.permissionText}>This app need permission to use camera for your sights!</Text>
            
                <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
                    <Text style={styles.primaryButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const takePhotoHandler = async () => {
                const result = await launchCameraAsync({ quality: 0.6});
                if(!result.canceled) {
                    if(onPhotoTaken){
                        onPhotoTaken((result.assets[0].uri))
                    }
            }}
    return (
        <View>        
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePhotoHandler}
            >
                <Text style={styles.cameraText}>{retake ? "Retake photo" : "Take photo"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
        floatingCamera: {
        position: "absolute",
        right: 20,
        top: -30,
        background: "#f7c552",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 6,
    },

    cameraButton: {
        backgroundColor: "#7d3d94",
        paddingVertical: 14,
        borderRadius:22,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 16,
    },
    cameraText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 16,
    },
    cameraEmoji: { fontSize: 28 },
    permissionTitle: { fontSize: 22, fontWeight: "900", marginBottom: 12, color: "#ec9d00"},
    permissionText: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#003d33"},
    primaryButton: { backgroundColor: "#008aec", paddingVertical: 14, paddingHorizontal: 38, borderRadius: 22},
    primaryButtonText: { color: "#fff", fontWeight: "800", fontSize: 16}
    }
)