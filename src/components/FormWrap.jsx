import { Controller } from "react-hook-form";
import { View } from "react-native";
import Input from "./Input.jsx";

export default function FormWrap({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    secureTextEntry,
    error,
    style,
    placeholderTextColor,
    icon,
    numberOfLines,
    textAlignVertical,
    multiline,
    rightComponent
}) {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View>
                    <Input
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}
                        keyboardType = {keyboardType}
                        secureTextEntry = {secureTextEntry}
                        error={error?.message}
                        style={style}
                        placeholderTextColor={placeholderTextColor}
                        icon={icon}
                        numberOfLines={numberOfLines}
                        textAlignVertical={textAlignVertical}
                        multiline={multiline}
                    />
                    {rightComponent} 
                    {/* може да се добави елемент до полето (проблема е че не е вътре) */}
                    
                </View>
            )}
        />
    )
}