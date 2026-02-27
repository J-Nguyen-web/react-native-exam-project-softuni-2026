import { useContext } from "react";
import { SightContext } from "./SightProvider.jsx";

export function useSight() {
    const context = useContext(SightContext)
    return context;
}