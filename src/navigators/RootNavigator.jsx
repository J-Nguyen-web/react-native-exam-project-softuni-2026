// Мястото за основния навигатор ( в случая е bottom tabs)
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator.jsx";
import DetailsSightScreen from "../screens/DetailsSightScreen.jsx";

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
            name='Details'
            options={{
                title:'Details',
                headerBackTitle: 'Back',
            }}
            component={DetailsSightScreen}
            />
        </Stack.Navigator>
    );
}