import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SightProvider } from './context/SightProvider.jsx';

    export default function App() {
        return (
        <NavigationContainer>
        {/* за да работят всички навигатори всички се обвиват в него*/}
            
            <StatusBar style="auto" />
                <SafeAreaProvider>
                    {/* <SafeAreaView> bugged for now - its depricated - use SafeAreaView from react-native-safe-area-context*/}
                        <SightProvider>
                            <RootNavigator />
                        </SightProvider>
                    {/* </SafeAreaView> */}
                </SafeAreaProvider>
        </NavigationContainer>
        );
    }
