import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.jsx";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ 
                title: "Sight 2 Share",                
                headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                headerTintColor: '#0077b6',
            }} />
        </Stack.Navigator>
    );
}