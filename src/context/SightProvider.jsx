import { createContext, useEffect, useState } from "react";
import { sightService } from "../services/index.js";

export const SightContext = createContext({
    sights: [],
    loading: false,
    getSightById(SightId){ },
    createSight(sight){ },
    deleteSight(SightId){ },
});

export function SightProvider ({children}) {
    const [sights, setSights] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        sightService.getAll()
        .then((data) => setSights(data))
        .catch((err) => console.error('Error while fetching sights: ', err))
        .finally(() => setLoading(false))
    },[])
    
    const createSight = async (sightData) => {
        try {
            setLoading(true)
            const newSight = await sightService.create(sightData);
            setSights(sightsList => [...sightsList, newSight]);
            return newSight;
        } catch (error) {
            console.error('Error creating sight: ', error);
        } finally {
            setLoading(false)
        }
    };

    const getSightById = async (id) => {
        try {
            setLoading(true)
            await new Promise(resolve => setTimeout(resolve, 5000));
            return await sightService.getById(id);
        } catch (error) {
            console.error('Error get sight: ', error);
        } finally {
            setLoading(false)
        }
    }
    
    const updateSight = async(id, data) => {
        try {
            setLoading(true)
            const updated = await sightService.update(id, data);
            setSights(previous => previous.map(sight => sight.id === id ? updated : sight)) // замяна на новия със стария
            return updated;
        } catch (error) {
            console.error('Error update sight: ', error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const reloadSights = async () => {
        try {
            setLoading(true)
            const data = await sightService.getAll();
            setSights(data);
        } catch(error) {
            console.error("Error reloading sights:", error)
        } finally {
            setLoading(false)
        }
    }

    const deleteSight = async(id)=>{
        try {
            setLoading(true)
            await sightService.deleteSight(id);
            setSights((sightsList) => sightsList.filter(sight => sight.id !== id));
        } catch (error) {
            console.error('Error deleting sight: ', error);
        } finally {
            setLoading(false)
        }
    }

    const contextValue = {
        sights,
        loading,
        createSight,
        getSightById,
        updateSight,
        reloadSights,
        deleteSight,
    }

    return (
        <SightContext.Provider value={contextValue}>
            {children}
        </SightContext.Provider>
    )
}

