import { StyleSheet, Text, TextInput, View } from "react-native"
import { globalStyles } from "../globalStyles.js";

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    secureTextEntry,
    error,
    style,
    placeholderTextColor,
    icon,
}) => {
    return (
        <View style={globalStyles.inputBlock}>
            
            <View style={globalStyles.inputGroup}>

                {icon}
                
                {label && <Text style={[globalStyles.inputLabel, {paddingLeft: 8}]}>{label}</Text>}

                <TextInput 
                    style={style}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
            <View>
                {error && <Text style={{color: "#ff0000", paddingBottom: 29}}>{error}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBlock: {
        backgroundColor: "#ffffff",
        borderRadius: 22,
        padding: 14,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: "#e4d3ec",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3},
        shadowRadius: 6,
        elevation: 3,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "800",
        color: "#7d3d94",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
})

export default Input;