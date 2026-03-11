import { LinearGradient } from "expo-linear-gradient";
import { globalColor, globalStyles } from "../globalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";

export default function ScreenWrapper({children, scroll = true}) {
    if(scroll) {
        return (
            <LinearGradient colors={[globalColor.gradientPrimo, globalColor.gradientSecundo]} style={globalStyles.gradient}>
                <SafeAreaView style={{flex:1}}>
                    <KeyboardAwareScrollView
                        enableOnAndroid = {true}
                        keyboardShouldPersistTaps="handled"
                        enableAutomaticScroll={true}
                        extraHeight={110}
                        extraScrollHeight={110}
                        contentContainerStyle={globalStyles.container}
                        keyboardOpeningTime={0}                        
                    >
                    {/* не ми xаресва как работи, ще оставя горния начин дори по спецификация да се изисква долното
                    <KeyboardAvoidingView 
                        style={{flex:1}} 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={80}
                    >   
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView 
                                contentContainerStyle={globalStyles.container}
                                keyboardShouldPersistTaps="handled"> */}
                                {children}
                            {/* </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView> */}
                        
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