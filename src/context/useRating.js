import { useContext } from "react";
import { RatingContext } from "./RatingProvider.jsx";

export function useRating(){
    const context = useContext(RatingContext);
    return context;
}