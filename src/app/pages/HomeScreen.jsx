'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Header from '../components/common/Header'
import StrapSlide from '../components/StrapSlide'
import CaseSlide from '../components/CaseSlide'
import SizeSlide from '../components/SizeSlide'
import useDropdown from '../context/Dropdown/useDropdown'
import HermesSeries from '../components/common/HermesSeries'
import SeriesTen from '../components/common/SeriesTen'
import AppleWatchSe from '../components/common/AppleWatchSe'

import watchData from '@/utils/data/BandData'
import hermesData from '@/utils/data/hermesData'
import seData from '@/utils/data/SpecialEditionData'

import { options } from '@/utils/shared/constants'
import { useActiveIndex } from '../context/ActiveIndex/ActiveIndexContext'
import { useSelection } from '../context/WatchSelect/WatchSelectContext'
import Navigation from '../components/Navigation'



const HomeScreen = () => {
    const [showWatch, setShowWatch] = useState(false)
    const { activeIndexes } = useActiveIndex();


    const { selectedOption } = useDropdown();
    const { isSelectingCase, isSelectingSize, isSelectingStrap, isSideViewVisible, setIsSelectingCase, setIsSelectingSize, setIsSelectingStrap, setIsSideViewVisible } = useSelection()


    // Determine which data to render based on selectedOption and selection state
    const getItemsToRender = () => {
        if (isSelectingStrap) {
            if (selectedOption === options[1]) return hermesData.bands;
            if (selectedOption === options[2]) return seData.bands;
            return watchData.bands;
        }
        if (isSelectingCase) {
            if (selectedOption === options[1]) return hermesData.cases;
            if (selectedOption === options[2]) return seData.cases;
            return watchData.cases;
        }
        if (isSelectingSize) {
            if (selectedOption === options[1]) return hermesData.sizes;
            if (selectedOption === options[2]) return seData.sizes;
            return watchData.sizes;
        }
        return [];
    };

    const itemsToRender = getItemsToRender();

    return (
        <>
            {/* Header section */}
            <Header
                showWatch={showWatch}
            />
            <main
                className={`mx-auto overflow-hidden ${isSelectingStrap || isSelectingCase || isSelectingSize ? "" : "max-w-3xl xl:mt-0 mt-10"} ${showWatch ? "" : "mt-10"}`}
                role="main"
                aria-labelledby='main-heading'
            >
                {/* Details Section */}
                <section
                    className={`transition-all duration-700 ease-linear ${showWatch ? "opacity-0 translate-y-0 h-0" : "opacity-100 translate-y-0 h-[360px] md:px-6 px-4"
                        }`}
                >
                    <h6 id='sub-heading' className="text-xl font-light">Apple Watch Studio</h6>
                    <h1 className="font-medium md:text-[4.1rem] text-[2.6rem] leading-[2.8rem] md:leading-[4rem] py-3"
                        role='main-heading'
                        aria-level="1"
                    >
                        Choose a case.<br />
                        Pick a band.<br />
                        Create your own style.
                    </h1>
                    <button
                        className="my-4 mt-10 text-lg appleBtn relative z-10"
                        onClick={() => setShowWatch(true)}
                        role='button'
                        aria-label="Get started customizing your Apple Watch"
                    >
                        Get Started
                    </button>
                </section>

                {/* Watch Section */}
                <section>
                    {isSelectingStrap ? <StrapSlide isSelectingStrap={isSelectingStrap} /> :
                        isSelectingCase ? <CaseSlide isSelectingCase={isSelectingCase} /> :
                            isSelectingSize ? <SizeSlide isSelectingSize={isSelectingSize} /> :
                                selectedOption === options[1] ?
                                    <HermesSeries
                                        showWatch={showWatch}
                                        isSideViewVisible={isSideViewVisible} /> :
                                    selectedOption === options[2] ?
                                        <AppleWatchSe
                                            showWatch={showWatch}
                                            isSideViewVisible={isSideViewVisible} /> :
                                        <SeriesTen
                                            showWatch={showWatch}
                                            isSideViewVisible={isSideViewVisible} />
                    }
                    <div className={`${showWatch ? "opacity-100" : "opacity-0"} delay-1000 duration-500 ease-linear`} role='watch-details'>
                        <div className='text-center xl:py-10 py-8 pt-0'>
                            <p className='text-blue-500 underline text-xs tracking-wider cursor-pointer'
                                onClick={() => setIsSideViewVisible(!isSideViewVisible)}
                                role='button'
                                aria-label="Toggle between front and side view"
                                aria-pressed={isSideViewVisible}
                                tabIndex={0}
                            >{isSideViewVisible ? "Front view" : "Side view"}</p>
                            <h6 className='uppercase text-gray-600 tracking-wider text-xs pt-3'>
                                {selectedOption === options[0] ? options[0]
                                    : selectedOption === options[1] ? options[1]
                                        : options[2]}
                            </h6>
                            <h4 className="font-medium text-wrap">
                                {itemsToRender[
                                    isSelectingStrap
                                        ? activeIndexes?.strap
                                        : isSelectingCase
                                            ? activeIndexes?.case
                                            : isSelectingSize
                                                ? activeIndexes?.size
                                                : null
                                ]?.watchName ||
                                    (selectedOption === options[0]
                                        ? "46mm Jet Black Aluminum Case with Black Solo Loop"
                                        : selectedOption === options[1]
                                            ? "46mm Silver Titanium Case with Satiné Grand H"
                                            : "44mm Silver Aluminum Case with Star Fruit Solo Loop")}
                            </h4>

                            <p className='font-thin text-sm tracking-wider'>
                                From ${itemsToRender[
                                    isSelectingStrap
                                        ? activeIndexes?.strap
                                        : isSelectingCase
                                            ? activeIndexes?.case
                                            : isSelectingSize
                                                ? activeIndexes?.size
                                                : null
                                ]?.price ||
                                    (selectedOption === options[0]
                                        ? "429"
                                        : selectedOption === options[1]
                                            ? "1949"
                                            : "279")}
                            </p>
                        </div>
                        <Navigation />
                    </div>
                </section>
            </main >
        </>
    )
}

export default HomeScreen
