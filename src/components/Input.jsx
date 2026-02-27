import { StyleSheet, Text, TextInput, View } from "react-native"

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    error
}) => {
    return (
        <View style={styles.inputBlock}>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
                <TextInput style={styles.modernInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}

                />
                {error && <Text>{error}</Text>}
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
    modernInput: {
        backgroundColor: "#f4e7f8",
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
        fontSize: 16,
        color: "#7d3d94",
        borderWidth: 1,
        borderColor: "#af57a6",
    },
})

export default Input;