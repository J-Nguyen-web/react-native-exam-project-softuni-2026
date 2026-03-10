import { ActivityIndicator, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
}) => {
    const buttonStyle = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
    ];
    
    const textStyles = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        style
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
        {loading && <ActivityIndicator color={variant === 'primary' ? '#fff' : '#000'} size='small' /> }
        {!loading && title && <Text style={textStyles}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        gap: 8,
    },
    primary: {
        backgroundColor: '#d969a5',
    },
    secondary: {
        backgroundColor: '#000'
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#1a9220'
    },
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    medium: {
        paddingVertical: 14,
        paddingHorizontal: 22,
    },
    large: {
        paddingVertical: 18,
        paddingHorizontal: 32,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: '#dec717',
    },
    secondaryText: {
        color: '#1010b7'
    },
    disabledText: {
        color: '#8d7070'
    }
})

export default Button;