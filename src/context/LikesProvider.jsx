import { createContext, useContext, useState, } from "react";

const LikeContext = createContext();

export function LikeProvider({ children }) {
    const [likesMap, setLikesMap] = useState({});

    const toggleLike = (id) => {
        setLikesMap((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    return (
        <LikeContext.Provider value={{ likesMap, toggleLike, setLikesMap}}>
            {children}
        </LikeContext.Provider>
    );
}

export const useLike = () => useContext(LikeContext)