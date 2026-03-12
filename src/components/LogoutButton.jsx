import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/useAuth.js";
import { Ionicons } from "@expo/vector-icons";
import { globalColor } from "../globalStyles.js";

export default function LogoutButton() {
    const { logout } = useAuth()

    function logoutHandler() {
        Alert.alert(
            "Logout",
            "Do you want to logout?",
            [
                {text: "Dismiss", style: "cancel"},
                {text: "Logout", style: "destructive", onPress: logout}
            ]
        )
    }
    return (
        <TouchableOpacity onPress={logoutHandler} style={{marginRight: 0}}>
            <View style={{flexDirection: "row", gap: 8}}>
                <Text style={{color: globalColor.primary}}>Logout</Text>
                <Ionicons name="log-out-outline" size={25} color={globalColor.primary} />
            </View>    
        </TouchableOpacity>
    );
}