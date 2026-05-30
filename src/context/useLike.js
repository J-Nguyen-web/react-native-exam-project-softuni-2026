import { useContext } from "react";
import { LikeContext } from "./LikesProvider.jsx" 

export function useLike(){
    const context = useContext(LikeContext);
    return context;
}