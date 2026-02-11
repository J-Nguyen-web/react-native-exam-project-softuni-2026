// Мястото за основния навигатор ( в случая е bottom tabs)

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import HomeNavigator from "./HomeNavigator.jsx";
import SigthsNavigator from "./SightsNavigator.jsx";
import AboutNavigator from "./AboutNavigator.jsx";
import AboutScreen from "../screens/AboutScreen.jsx";
import SightsScreen from "../screens/SightsScreen.jsx";

export default function RootNavigator() {

    const Tabs = createBottomTabNavigator();
    return (
        // за да работят всички навигатори за това се слага в RootNavigator-a
        <NavigationContainer>

            {/* между таг-а ще влизат всички иконки към screens */}
            <Tabs.Navigator screenOptions={{ tabBarPosition: 'bottom'}}>
                <Tabs.Screen name="Home" component={HomeNavigator} options={{
                    /* подаваме друг навигатор вместо screen , за да се използват всичките screen от него */
                    tabBarIcon: () => (
                        <Ionicons name="home-outline"
                         size={29}
                         color="black" /> 
                    )
                }}/>                

                <Tabs.Screen name="Sights" component={SightsScreen} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="view-dashboard-outline"
                         size={29}
                         color="black" /> 
                    )
                }}/>
                <Tabs.Screen name="About" component={AboutScreen} />
                {/* директно може да се подаде screen? */}
                
            </Tabs.Navigator>
        </NavigationContainer>
    );
}