// Мястото за основния навигатор ( в случая е bottom tabs)
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator.jsx";
import DetailsSightScreen from "../screens/DetailsSightScreen.jsx";
import FormSightScreen from "../screens/FormSightScreen.jsx";
import { useAuth } from "../context/useAuth.js";
import AuthNavigator from "./AuthNavigator.jsx";
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {

    const Stack = createNativeStackNavigator();
    const { isAuthenticated, isLoading, checkingAuth } = useAuth();
    console.log(isAuthenticated)

    if(checkingAuth){
        return (
            <View>
                <ActivityIndicator size={larger} color={"#793d94"}/>
            </View>
        )
    }

    if(isLoading) return null;

    return (
        <Stack.Navigator>
            { isAuthenticated ? (
                <Stack.Screen name='Auth' component={AuthNavigator} options={{headerShown: false}} />
            )
            : (
            <>
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

            <Stack.Screen 
                name='FormSight'
                options={{
                    presentation: "modal",
                    title:'Create your Inspiration',
                    headerBackTitle: 'Back',
                }}
                component={FormSightScreen}
            />
                </>
                
            )}
        </Stack.Navigator>
    );
}