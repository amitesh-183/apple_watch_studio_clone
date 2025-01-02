'use client';
import React, { createContext, useContext, useState } from 'react';

const ActiveIndexContext = createContext();

export const ActiveIndexProvider = ({ children }) => {
    const [activeIndexes, setActiveIndexes] = useState({
        strap: 0,
        case: 0,
        size: 0,
    });

    const setActiveIndex = (type, index) => {
        setActiveIndexes((prev) => ({ ...prev, [type]: index }));
    };

    return (
        <ActiveIndexContext.Provider value={{ activeIndexes, setActiveIndex }}>
            {children}
        </ActiveIndexContext.Provider>
    );
};

export const useActiveIndex = () => useContext(ActiveIndexContext);
