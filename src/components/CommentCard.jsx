import { Pressable, StyleSheet, Text, View } from "react-native"
import { globalColor } from "../globalStyles.js"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"

export default function  CommentCard({item, onEdit, onDelete}) {

    return(
        <View style={styles.commentCard} >   
            <View style={styles.commentHeader}>
                <View style={styles.userInfo}>
                    <View style={styles.commentAvatar}>

                    </View>
                    <Text style={styles.commentUsername}>
                        {item.username}
                    </Text>
                </View>

                <View style={styles.commentOptions}>
                    <Pressable
                        onPress={onEdit}
                        hitSlop={8}
                        style={ ({pressed}) =>[ styles.commentIcons,
                            pressed && styles.pressedIcon]}
                    >
                        <Feather name="edit" size={16} color="black" />
                    </Pressable>

                    <Pressable
                        onPress={onDelete}
                        hitSlop={8}
                        style={styles.commentIcons}
                        style={ ({pressed}) =>[ styles.commentIcons,
                            pressed && styles.pressedIcon]}
                    >
                        <MaterialCommunityIcons name="delete-forever-outline" size={18} color="#c33b3b" />
                    </Pressable>
                </View>
            </View>

            <Text style={styles.commentText}>
                {item.text}
            </Text>

        </View>            
    )

}

const styles = StyleSheet.create({

  commentSection: {
    marginTop: 28
  },

  commentTitle: {
    fontSize: 22,
    fontWeight:"800",
    color: globalColor.primary,
    marginBottom: 16
  },
  
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },

  commentInput: {
    flex: 1,
    backgroundColor: 'white',

    borderWidth: 1.5,
    borderColor: globalColor.primary,
    borderRadius: 18,

    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 3,

    elevation: 6,

    paddingHorizontal: 16,
    paddingVertical: 14,

    fontSize: 14,
    color: globalColor.primary,
  },
  
  commentCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: globalColor.turqouise,
    overflow: "hidden",
    marginBottom: 14,
    marginHorizontal: 14, 
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 11,

    elevation: 3,
  },
  
  commentHeader: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: "space-between",
    backgroundColor: globalColor.mint,
    overflow: "hidden",
    borderBottomRightRadius: 18,
    paddingHorizontal: 8,
  },
  
  commentAvatar: {
    flexDirection: "row",
    width: 25,
    height: 25,
    borderRadius: 999,
    backgroundColor: globalColor.gradientSecundo,

    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 8,
    marginVertical: 3,
  },

  commentAvatarText: {
    color: globalColor.primary,
    fontWeight: "800",
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },

  commentUsername: {
    fontSize: 14,
    fontWeight: "700",
    color: globalColor.primary,
  },

  commentText: {
    color: '#272626',
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 600,

    marginHorizontal: 18,
    marginVertical: 6,
  },

  commentOptions: {
    flexDirection: 'row',
    gap: 18,
    paddingTop: 3
  },

  commentIcons: {
    padding: 3,
    fontWeight: 100
  },

  pressedIcon: {
    opacity: 0.7,
    transform: [{ scale: 0.88}],
  },

  commentButton: {
    backgroundColor: globalColor.turqouise,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 3,

    elevation: 6,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight:"700",
  },
})