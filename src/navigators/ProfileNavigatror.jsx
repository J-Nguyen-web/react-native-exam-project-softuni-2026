import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen.jsx";
import { globalColor } from "../globalStyles.js";
import MySightsScreen from "../screens/MySightsScreen.jsx";

export default function ProfileNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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
                options={({ route }) => ({
                    title: route.params?.title || "My Sights",
                    // подаване на променлива чрез route от screen-a извикващ този screen

                    headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                    headerTintColor: globalColor.primary
                })}
                
            />
        </Stack.Navigator>
    );
}