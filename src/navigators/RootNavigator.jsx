// Мястото за основния навигатор ( в случая е bottom tabs)

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import HomeNavigator from "./HomeNavigator.jsx";
import SigthsNavigator from "./TabNavigator.jsx";
import AboutNavigator from "./AboutNavigator.jsx";
import AboutScreen from "../screens/AboutScreen.jsx";
import SightsScreen from "../screens/SightsScreen.jsx";
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
            name='SightsDetails'
            component={SightDetailsScreen}
            />
        </Stack.Navigator>
    );
}