import { LinearGradient } from "expo-linear-gradient";
import { globalColor, globalStyles } from "../globalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ScreenWrapper({children, scroll = true}) {
    if(scroll) {
        return (
            <LinearGradient colors={[globalColor.gradientPrimo, globalColor.gradientSecundo]} style={globalStyles.gradient}>
                <SafeAreaView style={{flex:1}}>
                    <KeyboardAwareScrollView
                        enableOnAndroid = {true}
                        keyboardShouldPersistTaps="handled"
                        enableAutomaticScroll={true}
                        extraHeight={80}
                        extraScrollHeight={80}
                        contentContainerStyle={globalStyles.container}
                        keyboardOpeningTime={0}                        
                    >
                        {children}
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </LinearGradient>
        )
    }
    return (
        <LinearGradient colors={[globalColor.gradientPrimo, globalColor.gradientSecundo]} style={globalStyles.gradient}>
            <SafeAreaView style={{flex:1}}></SafeAreaView>
        </LinearGradient>
    );
}