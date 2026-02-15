import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import HomeNavigator from "./HomeNavigator.jsx";
import AboutScreen from "../screens/AboutScreen.jsx";
import SightsScreen from "../screens/SightsScreen.jsx";

    const Tabs = createBottomTabNavigator();

export default function TabNavigator() {


return (
    <Tabs.Navigator>
        <Tabs.Screen name="HomeNavigator"  component={HomeNavigator} options={{
            // /* подаваме друг навигатор вместо screen , за да се използват всичките screen от него */
            headerShown: false,
            tabBarIcon: (color, size) => (
                <Ionicons name="home-outline" size={29} color="black"
                />
            ),
        }}/>                

        <Tabs.Screen name="Sights" component={SightsScreen} options={{
            headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
            headerTintColor: '#0077b6',
            // todo decorated sightx
            tabBarIcon: (color, size) => (
                <MaterialCommunityIcons name="view-dashboard-outline" size={29} color="black"
                />
            )
        }}/>
        <Tabs.Screen name="About" component={AboutScreen} />
        {/* директно може да се подаде screen? */}
    </Tabs.Navigator>
    );
}