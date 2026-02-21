import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

    export default function App() {
        return (
        <NavigationContainer>
        {/* за да работят всички навигатори всички се обвиват в него*/}

            <SafeAreaProvider>
                {/* <SafeAreaView> bugged for now - its depricated - use SafeAreaView from react-native-safe-area-context*/}

                <KeyboardAvoidingView // Keyboard-a да не закрива input полетата при писане, а да ги измества
                    style={{flex: 1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <RootNavigator />
                </KeyboardAvoidingView>

                {/* </SafeAreaView> */}
            </SafeAreaProvider>
        </NavigationContainer>
        );
    }
