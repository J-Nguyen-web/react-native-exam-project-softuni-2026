import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { globalColor } from "../globalStyles.js";
import { useSight } from "../context/useSight.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import Card from "../components/Card.jsx";

export default function SearchScreen() {
    
    const route = useRoute();
    const navigation = useNavigation();
    const initialQuery = route.params?.initialQuery || '';
    const [query, setQuery] = useState(initialQuery);
    const [searchResult, setSearchResult] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query); // за да не search при всяка буква
    const { sights } = useSight();

    useEffect(() => { // при промяна в търсенето да се презареди с новата търсена стойност
        if(route.params?.initialQuery)
        setQuery(route.params?.initialQuery)
    },[route.params?.initialQuery])

    useEffect(() => {
        const time = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(time)
    },[query])
    
    useEffect(()=>{

        const q = query.toLowerCase().trim();

        if(!q) {
            setSearchResult([]);
            return;
        }
        
        const filtered = sights.filter( sight => 
            sight.title?.toLowerCase().includes(q) ||
            sight.city?.toLowerCase().includes(q) ||
            sight.country?.toLowerCase().includes(q) ||
            sight.category?.toLowerCase().includes(q)
        )
        setSearchResult(filtered)
    },[debouncedQuery, sights])

    return (
        <View style={{flex: 1, padding: 14}}>
            <TextInput 
                autoFocus
                placeholder="Search country, city or title..."
                value={query}
                onChangeText={setQuery}
                style={{
                    borderWidth: 1,
                    borderColor: globalColor.primary,
                    borderRadius: 14,
                    padding: 14,
                }}
            />

            {debouncedQuery.length === 0 && (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                    Start typing to search
                </Text>
            )}

            {debouncedQuery.length > 0 && searchResult.length === 0 && (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                    No result found
                </Text>
            )}
            { searchResult.length > 0 &&(
                <FlatList 
                    data={searchResult || []}
                    keyExtractor={(item, index) => item?.id ? String(item.id) : String(index)}
                    renderItem={({item, index}) => <Card 
                                                        index={index} {...item}  
                                                        onPress={() => setQuery(item.country)}/>}
                                                        //IN EVERY SCREEN YOU CAN PUT DIFFERENT BEHAVIOUS ON PRESS FOR THE CARD COMPONENT
                    scrollEventThrottle={20}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
}