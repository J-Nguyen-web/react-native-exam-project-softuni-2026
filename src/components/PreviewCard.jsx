import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";

export default function PreviewCard() {
    const navigation = useNavigation();


    return (
        <Pressable onPress={ () => navigation.navigate('Gallery')}>
            <View>
                <Image />                
            </View>
            <View>
                <Text>dynamic - Recent or Most Liked</Text>
                {/* TODO Dynamic title */}
            </View>
        </Pressable>
    );
}