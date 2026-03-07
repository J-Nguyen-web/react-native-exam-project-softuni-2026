import { StyleSheet } from "react-native"

export const globalColor = {
    primary: "#793d94",
    placeholder: "#f2e3f0",
    gradientPrimo: "#ffffff",
    gradientSecundo: "#ddd6fe",
}

export const globalStyles = StyleSheet.create({

    gradient: { flex: 1},

    container: { 
        padding: 20, 
        flexGrow: 1, 
        justifyContent: 'center'
    },

    title: {
        fontSize: 28,
        fontWeight: "900",
        textAlign: 'center',
        color: globalColor.primary,
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: 'center',
        color: globalColor.primary,
        marginBottom: 28
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 26,
        padding:20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 11,
        elevation: 6,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: globalColor.placeholder,
        borderRadius: 20,
        paddingHorizontal: 14,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
         shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 2,
    },
    input: {
        flex: 1,
        paddingVertical: 11,
        paddingHorizontal: 8,
        color: "#000",
        fontWeight: "500",
    },
    button: {
        color: "#fff",
        backgroundColor: globalColor.primary,
    }
})