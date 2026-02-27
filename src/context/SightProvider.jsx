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
            setSights((sightsList) => [...sightsList, newSight]);
        } catch (error) {
            console.error('Error creating sight: ', err);
        }
    };

    const getSightById = async (id) => {
        try {
            return await sightService.getById(id);
        } catch (error) {
            
        }
    }

    const deleteSight = async(id)=>{
        try {
            await sightService.deleteSight(id);
            setSights((sightsList) => sightsList.filter(sight => sight.id !== id));
        } catch (error) {
            console.error('Error deleting sight: ', err);
        }
    }
}