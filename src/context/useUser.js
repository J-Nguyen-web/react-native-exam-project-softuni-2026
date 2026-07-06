import { useContext } from "react";
import { UserContext } from "./UserProvider.jsx";

export function useUser(){
    const context = useContext(UserContext)
}