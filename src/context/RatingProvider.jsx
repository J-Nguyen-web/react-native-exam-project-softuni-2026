import { createContext, useContext, useEffect, useState } from "react";
import * as ratingService from "../services/ratingService.js"

export const RatingContext = createContext();

export function RatingProvider({children}) {
    const [ratingsMap, setRatingsMap] = useState();
    const loadRatings = async () => {
        try {
            const allRatings = await ratingService.getAllRatings();
            
            if(!Array.isArray(allRatings)) {
                setRatingsMap({}); // ако няма правилна инфо дата да се сложи празен object да не crash
                return
            }
            const grouped = {};

            allRatings.forEach(rate => {
                if(!grouped[rate.sightId]) {
                    grouped[rate.sightId] = { sum: 0, count: 0}
                }

                grouped[rate.sightId].sum += rate.rating;
                grouped[rate.sightId].count += 1;
            });
            
            const result = {};

            Object.keys(grouped).forEach(id => {
                result[id] = {
                    average: grouped[id].sum / grouped[id].count,
                    count: grouped[id].count
                };
            });

            setRatingsMap(result)
        } catch (error) {
            console.error("Rating load error", error);
            setRatingsMap({}); // ако няма правилна инфо дата да се сложи празен object да не crash
        }
    }

    useEffect(() => {
        loadRatings()
    },[]);

    return (
        <RatingContext.Provider value={{ratingsMap, loadRatings}}>
            {children}
        </RatingContext.Provider>
    )
}

export const useRating = () => useContext(RatingContext)