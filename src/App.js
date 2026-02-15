import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
    <NavigationContainer>
    {/* за да работят всички навигатори всички се обвиват в него*/}

        <SafeAreaProvider>
            {/* <SafeAreaView> bugged for now*/}
                <RootNavigator />
            {/* </SafeAreaView> */}
        </SafeAreaProvider>
    </NavigationContainer>
    );
}
