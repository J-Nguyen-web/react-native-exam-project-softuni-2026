import { Controller } from "react-hook-form";
import { View } from "react-native";
import Input from "./Input.jsx";

export default function FormWrap({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    error
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
                        error={error?.message}
                    />
                </View>
            )}
        />
    )
}