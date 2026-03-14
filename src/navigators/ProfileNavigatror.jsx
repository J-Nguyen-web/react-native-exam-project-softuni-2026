import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen.jsx";
import { globalColor } from "../globalStyles.js";
import MySightsScreen from "../screens/MySightsScreen.jsx";

export default function ProfileNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator>
            <Stack.Screen 
                name="ProfileDetails" 
                component={ProfileScreen} 
                options={{
                    title: 'Profile',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                    headerTintColor: globalColor.primary
                }}
            />
            <Stack.Screen 
                name="MySights" 
                component={MySightsScreen} 
                options={{
                    title: 'My Sights',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                    headerTintColor: globalColor.primary
                }}
            />
        </Stack.Navigator>
    );
}