import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SightProvider } from './context/SightProvider.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RatingProvider } from './context/RatingProvider.jsx';

enableScreens();

export default function App() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <SightProvider>
                    <RatingProvider>
                        <NavigationContainer>
                    {/* за да работят всички навигатори всички се обвиват в него*/}
                        
                            <StatusBar style="auto" />
                                <SafeAreaProvider>
                                    {/* <SafeAreaView> bugged for now - its depricated - use SafeAreaView from react-native-safe-area-context*/}
                                                                    
                                        <RootNavigator />
                                                                        
                                    {/* </SafeAreaView> */}
                                </SafeAreaProvider>
                        </NavigationContainer>
                    </RatingProvider>
                </SightProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
