import { Pressable, StyleSheet, Text, View } from "react-native"
import { globalColor } from "../globalStyles.js"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { TextInput, } from "react-native"
import { useEffect, useRef } from "react"
import { formatDate } from "../util/formatDate.js"
import { formatTimeAgo } from "../util/formatTimeAgo.js"

export default function  CommentCard({
  item,
  isEditing,
  editedComment,
  setEditedComment,
  onEdit,
  onSave,
  onCancel,
  onDelete
}) {

    const inputRef = useRef(null); // useRef запазва референция към тази const като в началото е null

    useEffect(()=> {
        if(isEditing) {
            inputRef.current?.focus(); 
            // ако е isEditing и е current-(задава се в TextInput ref={inputRef}), pointer-а се слага вътре
        }
    },[isEditing]);

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
                    <Text>
                        {formatTimeAgo(item.createdAt)}
                    </Text>
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

            {
                isEditing ? (
                    <TextInput
                        ref={inputRef}
                        value={editedComment}
                        onChangeText={setEditedComment}
                        multiline
                        style={styles.commentInput}
                    />
                ) : (
                    <Text style={styles.commentText}>
                        {item.text}
                    </Text>                    
                )
            }
            {
                isEditing && (
                    <View style={styles.commentButtons}>
                        <Pressable
                            onPress={onSave}
                            hitSlop={8}
                            style={ ({pressed}) =>[ styles.saveButton,
                            pressed && styles.pressedIcon]}
                        >
                            <Feather name="check" size={16} color="white" />
                        </Pressable>

                        <Pressable
                            onPress={onCancel}
                            hitSlop={8}
                            style={ ({pressed}) =>[ styles.dismissButton,
                            pressed && styles.pressedIcon]}
                        >
                            <Feather name="x" size={16} color="green" />
                        </Pressable>
                    </View>
                )
            }
        </View>            
    )

}

const styles = StyleSheet.create({
  
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
    alignItems: 'center',
    gap: 8,
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

  dismissButton: {
    backgroundColor: '#f0efef',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: globalColor.turqouise,
    borderBottomRightRadius: 18,
  },
  saveButton: {
    backgroundColor: globalColor.turqouise,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomLeftRadius: 18,
  },

  commentButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
    paddingHorizontal: 16,
    paddingBottom: 8,
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