import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '../navigators/RootNavigator.jsx';

export default function App() {
    return (
        <SafeAreaProvider>
            {/* <SafeAreaView> bugged for now*/}
                <RootNavigator />
            {/* </SafeAreaView> */}
        </SafeAreaProvider>
    );
}
