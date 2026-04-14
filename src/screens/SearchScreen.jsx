import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { globalColor } from "../globalStyles.js";
import { useSight } from "../context/useSight.js";
import Card from "../components/Card.jsx";

export default function SearchScreen() {
    
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [debounce, setDebounce] = useState(query); // за да не search при всяка буква
    const { sights } = useSight();

    
    useEffect(()=>{

        const q = query.toLowerCase().trim();

        if(!q) {
            setSearchResult([]);
            return;
        }
        
        const filtered = sights.filter( sight => 
            sight.title.toLowerCase().includes(q) ||
            sight.city.toLowerCase().includes(q) ||
            sight.country.toLowerCase().includes(q)
        )
        setSearchResult(filtered)
    },[query, sights])

    return (
        <View style={{flex: 1}}>
            <TextInput 
                autoFocus
                placeholder="Search..."
                value={query}
                onChangeText={setQuery}
                style={{
                    borderWidth: 1,
                    borderColor: globalColor.primary,
                    borderRadius: 14,
                    padding: 14,
                }}
            />
            { searchResult.length > 0 &&(
                <FlatList 
                    data={searchResult || []}
                    keyExtractor={(item, index) => item?.id ? String(item.id) : String(index)}
                    renderItem={({item, index}) => <Card index={index} {...item} />}
                    scrollEventThrottle={20}
                />
            )}
        </View>
    );
}