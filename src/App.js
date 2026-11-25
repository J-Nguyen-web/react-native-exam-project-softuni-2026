import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SightProvider } from './context/SightProvider.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RatingProvider } from './context/RatingProvider.jsx';
import { LikeProvider } from './context/LikesProvider.jsx';
import { CommentProvider } from './context/CommentProvider.jsx';
import { UserProvider } from './context/UserProvider.jsx';

enableScreens();

export default function App() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <UserProvider>
                    <LikeProvider>
                        <CommentProvider>
                            <SightProvider>
                                <RatingProvider>
                                    <NavigationContainer>
                                {/* за да работят всички навигатори всички се обвиват в него*/}
                                    
                                            <SafeAreaProvider>                              
                                                    <RootNavigator />
                                                    <StatusBar style="auto" />
                                                    {/* не обвива, а е sibling */}
                                            </SafeAreaProvider>
                                    </NavigationContainer>
                                </RatingProvider>
                            </SightProvider>
                        </CommentProvider>
                    </LikeProvider>
                </UserProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
