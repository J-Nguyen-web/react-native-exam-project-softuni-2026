import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator.jsx";
import DetailsSightScreen from "../screens/DetailsSightScreen.jsx";
import FormSightScreen from "../screens/FormSightScreen.jsx";
import { useAuth } from "../context/useAuth.js";
import AuthNavigator from "./AuthNavigator.jsx";
import { ActivityIndicator, Text, View } from "react-native";
import LogoutButton from "../components/LogoutButton.jsx"
import { globalColor, globalStyles } from "../globalStyles.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen.jsx";

const Stack = createStackNavigator(); // извън навигатора - да не се recreat всеки render

export default function RootNavigator() {

    const { isAuthenticated, isLoading, checkingAuth } = useContext(AuthContext);

    if(checkingAuth || isLoading){
        return (
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator color={globalColor.primary}/>
                                <Text style={globalStyles.loadingText}>
                                    Loading...  may take up to 50 seconds if the server is waking up
                                </Text>
            </View>
        )
    }

    if(isLoading) return null;

    return (
        <Stack.Navigator 
            key={isAuthenticated ? "auth" : "guest"}
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                fullScreenGestureEnabled: true,
                animation: 'slide_from_right',
                headerTitleAlign: 'center',
            }}
        >
            { !isAuthenticated ? (
                <Stack.Screen
                name='Auth'
                component={AuthNavigator}
                options={{headerShown: false}} 
                />
            )
            : (
            <>
            <Stack.Screen
                name='Tabs'
                component={TabNavigator}
                options={{
                    headerShown: false,
                    title: "Sight2Share"
                }}
            />
            
            <Stack.Screen 
                name='Details'
                options={{
                    title:'Details',
                    headerBackTitle: 'Back',
                    headerTintColor: globalColor.turqouise
                }}
                component={DetailsSightScreen}
            />

            <Stack.Screen 
                name='FormSight'
                options={{
                    presentation: "modal",
                    title:'Create your inspiration',
                    headerBackTitle: 'Back',
                }}
                component={FormSightScreen}
            />
                </>
            )}
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ presentation: 'formSheet'}}
            />
        </Stack.Navigator>
    );
}