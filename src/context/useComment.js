import { useContext } from "react";
import { CommentContext } from "./CommentProvider.jsx";

export function useComment(){
    const context = useContext(CommentContext);
    return context;
}