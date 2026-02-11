import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  style: {
    backgroundColor: "#d5f3f7",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#01b9a9",
    marginBottom: 23,
    marginHorizontal: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
  },

  card: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 11,
    shadowOffset: {width: 0, height:6 },

    elevation: 8,
  },

  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  content: {
    padding: 16,
    backgroundColor: "#f7f8db",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontS: 22,
    fontWeight: "800",
    color: "#0077b6",
    flex: 1,
  },

  ratingStar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffd166",
  },

  location: {
    fontSize: 14,
    color: "#555555",
    fontStyle: "italic",
    marginTop: 3,
  },

  
});