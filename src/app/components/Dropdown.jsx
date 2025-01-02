'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useDropdown from '../context/Dropdown/useDropdown'
import { options } from '@/utils/shared/constants'
import { useSelection } from '../context/WatchSelect/WatchSelectContext'


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { selectedOption, setSelectedOption } = useDropdown();
    const { isSelectingCase, isSelectingSize, isSelectingStrap, isSideViewVisible, setIsSelectingCase, setIsSelectingSize, setIsSelectingStrap, setIsSideViewVisible } = useSelection()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setIsSelectingCase(false)
        setIsSelectingStrap(false)
        setIsSelectingSize(false)

    };
    return (
        <>
            <div className='relative'>
                <button onClick={() => setIsOpen(!isOpen)} className='flex items-center sm:text-lg text-base cursor-pointer' aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls="dropdown-options">
                    Collections <span><Image src='/assets/icons/arrowLeft.svg' alt='dropdown-arrow' height={10} width={20} className='-rotate-90 translate-y-[2px]' /></span>
                </button>
                {isOpen &&
                    <div id="dropdown-options"
                        role="listbox"
                        aria-activedescendant={selectedOption || ''}
                        className='absolute top-1/2 left-1/2 md:-translate-x-1/2 -translate-x-10 translate-y-6 text-center bg-white rounded-2xl w-fit z-[10]'>
                        {options.map((option) => (
                            <h4
                                key={option}
                                role="option"
                                id={option}
                                aria-selected={selectedOption === option}
                                tabIndex={0}
                                onClick={() => handleOptionClick(option)}
                                className={`p-4 cursor-pointer tracking-wide md:w-96 w-[calc(100vw-3rem)] font-thin md:text-lg text-sm rounded-2xl ${selectedOption === option
                                    ? ' text-gray-400'
                                    : ' hover:text-blue-600'
                                    }`}
                            >
                                {option}
                            </h4>
                        ))}
                    </div>
                }
            </div>
            {isOpen &&
                <div onClick={() => setIsOpen(false)}
                    role="presentation"
                    aria-hidden="true" className='inset-0 bg-black/20 absolute z-[5]'></div>
            }
        </>
    )
}

export default Dropdown