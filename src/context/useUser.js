import { useContext } from "react";
import { useUser } from "./UserProvider.jsx";

export function useUser(){
    const context = useContext(useUser)
}