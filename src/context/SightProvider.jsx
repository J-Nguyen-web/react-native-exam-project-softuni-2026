import { createContext, useEffect, useState } from "react";
import { sightService } from "../services/index.js";

export const SightContext = createContext({
    sights: [],
    getSightById(SightId){ },
    createSight(sight){ },
    deleteSight(SightId){ },
});

export function SightProvider ({children}) {
    const [sights, setSights] = useState([]);

    useEffect(() => {
        sightService.getAll()
        .then((data) => setSights(data))
        .catch((err) => console.error('Error while fetching sights: ', err))
    },[])
    
    const createSight = async (sightData) => {
        try {
            const newSight = await sightService.create(sightData);
            setSights(sightsList => [...sightsList, newSight]);
            return newSight;
        } catch (error) {
            console.error('Error creating sight: ', error);
        }
    };

    const getSightById = async (id) => {
        try {
            return await sightService.getById(id);
        } catch (error) {
            console.error('Error get sight: ', error);
        }
    }
    
    const updateSight = async(id, data) => {
        try {
            const updated = await sightService.update(id, data);
            setSights(previous => previous.map(sight => sight.id === id ? updated : sight)) // замяна на новия със стария
            return updated;
        } catch (error) {
            console.error('Error update sight: ', error);
            throw error
        }
    }

    const deleteSight = async(id)=>{
        try {
            await sightService.deleteSight(id);
            setSights((sightsList) => sightsList.filter(sight => sight.id !== id));
        } catch (error) {
            console.error('Error deleting sight: ', error);
        }
    }

    const contextValue = {
        sights,
        createSight,
        getSightById,
        updateSight,
        deleteSight,
    }

    return (
        <SightContext.Provider value={contextValue}>
            {children}
        </SightContext.Provider>
    )
}

