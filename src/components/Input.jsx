import { Text, TextInput, View } from "react-native"

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    error
}) => {
    return (
        <View>
            {label && <Text>{label}</Text>}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}

                />
                {error && <Text>{error}</Text>}
        </View>
    )
}

export default Input;