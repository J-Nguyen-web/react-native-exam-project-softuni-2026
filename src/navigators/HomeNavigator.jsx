import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.jsx";
import { globalColor } from "../globalStyles.js";
import LogoutButton from "../components/LogoutButton.jsx";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator screenOptions={{headerRight: () => <LogoutButton /> }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ 
                title: "Sight 2 Share",
                tabBarActiveTintColor: globalColor.primary,
                headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                headerTintColor: globalColor.primary,
                // headerShown: false
            }} />
        </Stack.Navigator>
    );
}