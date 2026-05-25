import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import { globalColor } from "../globalStyles.js";

export default function DateInput({ value, onChange }) {
    const [show, setShow] = useState();

    const toglePick = () => setShow(!show);
    
    return (
        <View>
            <TouchableOpacity onPress={toglePick} style={{ padding: 8, borderWidth: 1, borderRadius: 6, borderStyle: 'solid', borderColor: globalColor.turqouise}}>
                <Text>{value instanceof Date ? value?.toLocaleDateString?.() : "Select date"}</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "compact" : "default"}
                    onChange={(event, date) => {
                        setShow(false);
                        if (date) onChange(date);
                    }}
                />
            )}
        </View>    
    );
}