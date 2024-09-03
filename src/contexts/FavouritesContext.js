import React, { createContext, useState, useContext } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const addToFavourites = (house) => {
        setFavourites([...favourites, house]);
    };

    const removeFromFavourites = (id) => {
        setFavourites(favourites.filter(house => house.id !== id));
    };

    const isInFavourites = (id) => {
        return favourites.some(house => house.id === id);
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, isInFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
