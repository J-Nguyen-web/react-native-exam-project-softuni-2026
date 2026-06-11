import { createContext, useContext, useEffect, useState } from "react";
import * as ratingService from "../services/ratingService.js"

export const RatingContext = createContext();

export function RatingProvider({children}) {
    const [ratingsMap, setRatingsMap] = useState({});

    const getAllRatings = async() => {
        try {
            const allRatings = await ratingService.getAllRatings();
            return allRatings;
        } catch (error) {
            console.error('Error get rating data info',error)
        }
    }

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

    const createRating = async(rate) => {
        try {
            const newRating = await ratingService.createRating(rate);
            await loadRatings(); // recalculate averages - TODO setRtingMap Optimized
            return newRating;
        } catch (error) {
            console.error('Error create rating',error)
        }
    }

    const updateRating = async (rateId, update) => {
        try {
            const updatedRating = await ratingService.updateRating(rateId, update);
            await loadRatings();
            return updatedRating;
        } catch (error) {
            console.error('Error update rating',error);
        }
    }
    
    const getUserRating = async(userId) => {
        try {
            const userRating = await ratingService
        } catch (error) {
            console.error('Error getting the rating of the user',error)
        }
    }
    
    const getSightRating = async(sightId) => {
        try {
            return await ratingService.getSightRating(sightId);
        } catch (error) {
            console.error('Error get the rating of the sight',error);
            return null;
        }
    }

    useEffect(() => {
        loadRatings()
    },[]);

    const contextValue = {
        getAllRatings,
        createRating,
        updateRating,
        getUserRating,
        getSightRating
    }

    return (
        <RatingContext.Provider value={contextValue}>
            {children}
        </RatingContext.Provider>
    )
}

export const useRating = () => useContext(RatingContext)