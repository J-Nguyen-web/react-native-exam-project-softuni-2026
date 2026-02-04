import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SightsScreen from "../screens/SightsScreen.jsx";

export default function SigthsNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        
        // всички screens в който ще са със stack navigator (със стрелка за back, за да не се stack множество екрани)
        <Stack.Navigator>
            <Stack.Screen name="Sights" component={SightsScreen} />
        </Stack.Navigator>
    );
}