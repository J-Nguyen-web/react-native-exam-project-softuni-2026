// Мястото за основния навигатор ( в случая е bottom tabs)

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator.jsx";
import { NavigationContainer } from "@react-navigation/native";

export default function RootNavigator() {

    const Tabs = createBottomTabNavigator();
    return (
        // за да работят всички навигатори за това се слага в RootNavigator-a
        <NavigationContainer>

            {/* между таг-а ще влизат всички screens в които ще управлява navigator-a */}
            <Tabs.Navigator>
                <Tabs.Screen name="HomeTab" component={HomeNavigator} />
                {/* подаваме друг навигатор вместо screen , за да се използват всичките screen от него */}
            </Tabs.Navigator>
        </NavigationContainer>
    );
}