import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        async function  loadState() {
            try {
                const storedValue = await AsyncStorage.getItem(key);

                if (!storedValue) return;

                setState(JSON.parse(storedValue));
            } catch (error) {
                console.error('Error load state', error)
            }
        }

        loadState();
    },[key]);

    const setPersistedState = async(value) => {
        try {
            const valueStore = value instanceof Function ? value(state) : value;

            setState(valueStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueStore));
        } catch (error) {
                console.error('Error save state', error)
        }
    }

    return [state, setPersistedState];
}