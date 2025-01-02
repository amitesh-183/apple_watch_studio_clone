'use client'
import React from 'react'
import { useSelection } from '../context/WatchSelect/WatchSelectContext'
import { options } from '@/utils/shared/constants'
import useDropdown from '../context/Dropdown/useDropdown';
import Image from 'next/image';
import { useActiveIndex } from '../context/ActiveIndex/ActiveIndexContext';

const Navigation = () => {
    const { selectedOption } = useDropdown();
    const { activeIndexes, setActiveIndex } = useActiveIndex();
    const { isSelectingCase, isSelectingSize, isSelectingStrap, isSideViewVisible, setIsSelectingCase, setIsSelectingSize, setIsSelectingStrap, setIsSideViewVisible } = useSelection()


    const handleSelection = (type) => {
        // Reset all states to false
        setIsSelectingStrap(false);
        setIsSelectingCase(false);
        setIsSelectingSize(false);

        // Set the clicked type to true
        if (type === 'strap') setIsSelectingStrap(true);
        if (type === 'case') setIsSelectingCase(true);
        if (type === 'size') setIsSelectingSize(true);
    };
    return (
        <>
            <ul className={`flex justify-center ${isSelectingCase || isSelectingSize || isSelectingStrap ? "justify-start" : ""} items-center gap-2 sm:mt-10 overflow-x-auto md:w-full w-[calc(100vw-0.4rem)] md:px-0 px-2 mx-auto`} role="list" aria-label="Navigation Options">
                <li className={`flex items-center gap-1 md:text-lg text-base bg-gray-200 px-6 py-2 rounded-full cursor-pointer ${isSelectingSize ? "w-full max-w-fit duration-[2s] ease-linear" : "w-[100px]"}`} onClick={() => handleSelection("size")}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelectingSize}
                    aria-label="Select Size"
                    onKeyDown={(e) => e.key === 'Enter' && handleSelection('size')}><Image src={"/assets/icons/sizesOutlined.svg"} alt='size-icon' height={18} width={18} />{isSelectingSize && selectedOption === options[0] ? (<>
                        <div className="flex gap-3" role="group" aria-label="Size Options">
                            <span className={`${activeIndexes?.size === 0 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 0)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 0}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 0)}>42mm</span>
                            <span className={`${activeIndexes?.size === 1 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 1)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 1}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 1)}>46mm</span>
                        </div>
                    </>) : isSelectingSize && selectedOption === options[1] ? (<>
                        <div className="flex gap-3">
                            <span className={`${activeIndexes?.size === 0 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 0)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 0}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 0)}>42mm</span>
                            <span className={`${activeIndexes?.size === 1 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 1)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 1}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 1)}>46mm</span>
                        </div>
                    </>) : isSelectingSize && selectedOption === options[2] ? (<>
                        <div className="flex gap-3">
                            <span className={`${activeIndexes?.size === 0 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 0)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 0}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 0)}>40mm</span>
                            <span className={`${activeIndexes?.size === 1 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('size', 1)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.size === 1}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('size', 1)}
                            >44mm</span>
                        </div>
                    </>) : "Size"}</li>
                <li className={`flex items-center gap-1 md:text-lg text-base bg-gray-200 px-6 py-2 rounded-full cursor-pointer ${isSelectingCase ? "w-full max-w-fit duration-[2s] ease-linear" : "w-[100px]"}`} onClick={() => handleSelection("case")}><Image src={"/assets/icons/caseOutlined.svg"} alt='case-icon' height={18} width={18} />{isSelectingCase && selectedOption === options[0] ? (<>
                    <div className='flex gap-3'
                        role="group"
                        aria-label="Case Options">
                        <span className={`${activeIndexes?.case <= 2 ? "font-bold" : ""}`}
                            onClick={() => setActiveIndex('case', 0)} tabIndex={0}
                            role="button"
                            aria-pressed={activeIndexes?.case <= 2}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('case', 0)}>Aluminum</span>
                        <span className={`${activeIndexes?.case >= 3 ? "font-bold" : ""}`}
                            onClick={() => setActiveIndex('case', 3)} tabIndex={0}
                            role="button"
                            aria-pressed={activeIndexes?.case >= 3}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('case', 3)}>Titanium</span>
                    </div>
                </>) : isSelectingCase && selectedOption === options[1] ? (<>
                    <span className="font-bold">Titanium</span>
                </>) : isSelectingCase && selectedOption === options[2] ? (<>
                    <span className="font-bold">Aluminum</span>
                </>) : "Case"}</li>
                <li
                    className={`flex items-center gap-1 md:text-lg text-base bg-gray-200 px-6 py-2 rounded-full ${isSelectingStrap ? "w-full max-w-fit duration-1000 ease-linear" : "w-[100px]"} cursor-pointer transition-all`}
                    onClick={() => handleSelection("strap")}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelectingStrap}
                    aria-label="Select Strap"
                    onKeyDown={(e) => e.key === 'Enter' && handleSelection('strap')}>
                    <Image src={"/assets/icons/bandOutlined.svg"}
                        alt='strap-icon'
                        height={10}
                        width={10}
                        className='object-cover' />
                    {isSelectingStrap && selectedOption === options[0] ? (<>
                        <div className='flex gap-3 text-nowrap'>
                            <span className={`${activeIndexes?.strap <= 5 ? "font-bold" : ""}`}
                                onClick={() => setActiveIndex('strap', 0)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 5}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 0)}>Stainless Steel</span>
                            <span className={`${activeIndexes?.strap <= 12 && activeIndexes?.strap >= 6 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 6)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 12}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 6)}>Sport Loop</span>
                            <span className={`${activeIndexes?.strap <= 22 && activeIndexes?.strap >= 13 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 13)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 22}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 13)}>Sport Band</span>
                            <span className={`${activeIndexes?.strap <= 25 && activeIndexes?.strap >= 23 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 23)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 25}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 23)}>FineWoven</span>
                            <span className={`${activeIndexes?.strap <= 32 && activeIndexes?.strap >= 26 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 26)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 32}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 26)}>Braided Solo Loop</span>
                            <span className={`${activeIndexes?.strap <= 37 && activeIndexes?.strap >= 33 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 33)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 37}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 37)}>Solo Loop</span>
                            <span className={`${activeIndexes?.strap <= 42 && activeIndexes?.strap >= 38 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 38)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 42}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 38)}>Nike Sport Loop</span>
                            <span className={`${activeIndexes?.strap <= 49 && activeIndexes?.strap >= 43 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 43)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeIndexes?.strap <= 49}
                                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 43)}>Nike Sport Band</span>
                        </div>
                    </>)
                        : isSelectingStrap && selectedOption === options[1] ? (<>
                            <div className='flex gap-3 text-nowrap'>
                                <span className={`${activeIndexes?.strap <= 0 ? "font-bold" : ""}`}
                                    onClick={() => setActiveIndex('strap', 0)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 0}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 0)}>Hermès Toile H</span>
                                <span className={`${activeIndexes?.strap <= 2 && activeIndexes?.strap >= 1 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 1)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 2}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 1)}>Hermès Torsade</span>
                                <span className={`${activeIndexes?.strap <= 7 && activeIndexes?.strap >= 3 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 3)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 7}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 3)}>Hermès Kilim</span>
                                <span className={`${activeIndexes?.strap <= 8 && activeIndexes?.strap >= 8 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 8)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 8}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 8)}>Hermès Grand H</span>
                            </div>
                        </>) : isSelectingStrap && selectedOption === options[2] ? (<>
                            <div className='flex gap-3 text-nowrap'>
                                <span className={`${activeIndexes?.strap <= 5 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 0)} tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 5}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 0)}>Stainless Steel</span>
                                <span className={`${activeIndexes?.strap <= 12 && activeIndexes?.strap >= 6 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 6)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 12}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 6)}>Sport Loop</span>
                                <span className={`${activeIndexes?.strap <= 22 && activeIndexes?.strap >= 13 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 13)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 22}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 13)}>Sport Band</span>
                                <span className={`${activeIndexes?.strap <= 25 && activeIndexes?.strap >= 23 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 23)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 25}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 23)}>FineWoven</span>
                                <span className={`${activeIndexes?.strap <= 32 && activeIndexes?.strap >= 26 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 26)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 32}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 26)}>Braided Solo Loop</span>
                                <span className={`${activeIndexes?.strap <= 37 && activeIndexes?.strap >= 33 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 33)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 37}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 33)}>Solo Loop</span>
                                <span className={`${activeIndexes?.strap <= 42 && activeIndexes?.strap >= 38 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 38)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 42}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 38)}>Nike Sport Loop</span>
                                <span className={`${activeIndexes?.strap <= 49 && activeIndexes?.strap >= 43 ? "font-bold" : ""}`} onClick={() => setActiveIndex('strap', 43)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={activeIndexes?.strap <= 49}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex('strap', 43)}>Nike Sport Band</span>
                            </div>
                        </>) :
                            "Band"}</li>
            </ul>
        </>
    )
}

export default Navigation