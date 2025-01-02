'use client'
import React, { createContext, useContext, useState } from 'react';

// Create the context
const SelectionContext = createContext();

// Create a provider component
export const SelectionProvider = ({ children }) => {
    const [isSelectingStrap, setIsSelectingStrap] = useState(false);
    const [isSelectingCase, setIsSelectingCase] = useState(false);
    const [isSelectingSize, setIsSelectingSize] = useState(false);
    const [isSideViewVisible, setIsSideViewVisible] = useState(false);

    return (
        <SelectionContext.Provider
            value={{
                isSelectingStrap,
                isSelectingCase,
                isSelectingSize,
                isSideViewVisible,
                setIsSideViewVisible,
                setIsSelectingCase,
                setIsSelectingSize,
                setIsSelectingStrap
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useSelection = () => useContext(SelectionContext);
