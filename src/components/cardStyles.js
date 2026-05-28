import { StyleSheet } from "react-native";
import { globalColor } from "../globalStyles.js";

export const cardStyles = StyleSheet.create({
  style: {
    backgroundColor: "#d5f3f7",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: globalColor.turqouise,
    marginHorizontal: 14,
    marginBottom: 14,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 50,
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

titleColumn: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },

  authorColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch', // дори да е разтегнат parent-a от друг елемент, space-between не го поставя в дъното и е нужен strech
    alignItems: 'flex-end',
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    // color: "#0077b6",
    color: globalColor.primary,
  },

  ratingStar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffd166",
  },

  location: {
    fontSize: 16,
    color: "#555555",
    fontStyle: "italic",
    marginTop: 14,
  },

  description: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 18,
  }
});