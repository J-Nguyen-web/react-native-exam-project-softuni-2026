import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

// export default function RefreshableScreen() {
//     const [refreshing, setRefreshing]= useState(false);

    // const refreshHandler = async () => {
    //     setRefreshing(true);
    //     await onRefresh?.(); // място за логиката спрямо екрана
    //     setRefreshing(false)
    // }

    export const RefreshableScreen = ({ children, reload, loading }) => {
        return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={reload} />
            }
            contentConteinerStyle={{ FlexGrow: 1 }}
        >
            {children}
        </ScrollView>
    );
}
