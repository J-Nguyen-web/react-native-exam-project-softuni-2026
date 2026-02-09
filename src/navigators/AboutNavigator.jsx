import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../screens/AboutScreen.jsx";

export default function AboutNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
}