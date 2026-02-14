import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';

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
