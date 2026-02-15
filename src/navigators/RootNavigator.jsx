// Мястото за основния навигатор ( в случая е bottom tabs)
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator.jsx";
import SightDetailsScreen from "../screens/SightDetailsScreen.jsx";

export default function RootNavigator() {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='Tabs'
            component={TabNavigator}
            options={{headerShown: false}}
            />
            
            <Stack.Screen 
            name='SightDetails'
            options={{
                title:'Details',
                headerBackTitle: 'Back',
            }}
            component={SightDetailsScreen}
            />
        </Stack.Navigator>
    );
}