import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons"
import HomeNavigator from "./HomeNavigator.jsx";
import AboutScreen from "../screens/AboutScreen.jsx";
import SightsScreen from "../screens/SightsScreen.jsx";
import { globalColor } from "../globalStyles.js";
import ProfileNavigator from "./ProfileNavigatror.jsx";

    const Tabs = createBottomTabNavigator();

export default function TabNavigator() {


return (
    <Tabs.Navigator 
        screenOptions={{
            tabBarStyle: {paddingTop:8 ,},
            tabBarLabelStyle: {fontSize: 14}
            }}>
        <Tabs.Screen name="HomeNavigator"  component={HomeNavigator} options={{
            // /* подаваме друг навигатор вместо screen , за да се използват всичките screen от него */
            headerShown: false,
            title: "Home",
            tabBarActiveTintColor: globalColor.primary,
            tabBarInactiveTintColor: globalColor.roseAsh,
            tabBarIcon: ({ focused ,color, size}) => (
                <Ionicons name="home-outline" size={ focused ? size+3 : size-3 } color= {color}
                />
            ),
        }}/>                

        <Tabs.Screen name="Sights" component={SightsScreen} options={{
            headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
            tabBarActiveTintColor: globalColor.primary,
            tabBarInactiveTintColor: globalColor.roseAsh,
            headerTintColor: globalColor.primary,
            // todo decorated sightx
            tabBarIcon: ({ focused ,color, size}) => (
                <MaterialCommunityIcons name="view-dashboard-outline" size={ focused ? size+6 : size } color={color}
                />
            )
        }}/>
        <Tabs.Screen name="Profile" component={ProfileNavigator} options={{
            headerShown: false,
            tabBarActiveTintColor: globalColor.primary,
            tabBarInactiveTintColor: globalColor.roseAsh,
            // todo decorated sightx
            tabBarIcon: ({focused,color, size}) => (
                <FontAwesome6 name="user" size={ focused ? size+6 : size-6 } color={color}
                />
            )
        }}/>
        {/* <Tabs.Screen name="About" component={AboutScreen} /> */}
        {/* директно може да се подаде screen? */}
    </Tabs.Navigator>
    );
}