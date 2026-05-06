import { StyleSheet } from "react-native"

export const globalColor = {
    primary: "#793d94",
    pink: '#d949a5',
    roseAsh: "#c4b0cf",
    blue: "#0077b6",
    turqouise: "#01b9a9",
    placeholder: "#f2e3f0",
    gradientPrimo: "#ffffff",
    gradientSecundo: "#ddd6fe",
    gradientVerdi: "#befec7"
}

const C = {
  background: "#1a2e1a",
  card: "#142214",
  secondary: "#253825",
  foreground: "#f0ece0",
  muted: "#8a9e7a",
  primary: "#c8a84b",
  border: "rgba(7, 190, 114, 0.18)",
};

export const globalStyles = StyleSheet.create({

    gradient: { flex: 1},

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    loadingText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color:"#777",
    },

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
    },

  root: {
    flex: 1,
    backgroundColor: C.background,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.background,
    zIndex: 10,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 60 },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    gap: 20,
  },
  section: { gap: 10 },

  // Title
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: C.foreground,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  authorText: { fontSize: 14, color: C.muted, flexShrink: 1 },
  authorName: { color: C.foreground, fontWeight: "600" },

  // Stars
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  starsRow: { flexDirection: "row", gap: 2 },
  starWrapper: { position: "relative", width: 20, height: 20 },
  star: { fontSize: 18, position: "absolute" },
  starFillOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden",
  },
  ratingNumber: {
    fontFamily: "monospace",
    fontSize: 13,
    color: C.primary,
    fontWeight: "600",
  },
  ratingCount: { fontSize: 14, color: C.muted , fontStyle: 'italic'},

  // Divider
  divider: { height: 1, backgroundColor: "#01b9a9", marginVertical: 6 },

  // Country
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fieldLabel: {
    fontSize: 8,
    color: C.muted,
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
  countryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(200,168,75,0.35)",
    backgroundColor: "rgba(200,168,75,0.07)",
  },
  countryFlag: { fontSize: 16 },
  countryName: {
    fontSize: 14,
    color: C.primary,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  countryChevron: { fontSize: 16, color: "rgba(200,168,75,0.5)" },

  // Location
  locationRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  locationPin: { fontSize: 13, marginTop: 1 },
  locationText: { fontSize: 12, flexShrink: 1, lineHeight: 18 },
  locationMuted: { color: C.muted, fontFamily: "monospace", fontSize: 11 },

  // Description
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: C.foreground,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 14,
    color: C.muted,
    lineHeight: 22,
  },


    edit: {
        backgroundColor: "#fbf300",
        color: "#000"
    },
    delete: {
        backgroundColor: "#ff0000",
        color: "#ffffff"
    }
})