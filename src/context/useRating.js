import { useContext } from "react";
import { RatingContext } from "./ratingProvider.jsx";

export function useRating(){
    const context = useContext(RatingContext);
    return context;
}