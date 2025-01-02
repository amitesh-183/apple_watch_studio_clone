'use client';
import { createContext, useState } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState('Apple Watch Series 10');

    return (
        <DropdownContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </DropdownContext.Provider>
    );
};

export default DropdownContext;
