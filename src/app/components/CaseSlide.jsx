'use client'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import seData from '@/utils/data/SpecialEditionData';


// import required modules
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import Image from 'next/image';
import useDropdown from '../context/Dropdown/useDropdown';
import { options } from '@/utils/shared/constants';
import { useActiveIndex } from '../context/ActiveIndex/ActiveIndexContext';
import hermesData from '@/utils/data/hermesData';
import watchData from '@/utils/data/BandData';
import Loading from './common/Loading';



const CaseSlide = ({ isSelectingCase }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [screenSize, setScreenSize] = useState('lg');
    const swiperRef = useRef(null);

    const { selectedOption } = useDropdown();
    const { activeIndexes, setActiveIndex } = useActiveIndex();

    useEffect(() => {
        // Simulate a delay for loader (replace with actual loading logic if needed)
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Synchronize swiper with activeIndexes.size
    useEffect(() => {
        if (swiperRef.current?.swiper && activeIndexes.case !== undefined) {
            swiperRef.current.swiper.slideTo(activeIndexes.case);
        }
    }, [activeIndexes.case]);

    const handleSlideClick = (index) => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
            setActiveIndex('case', index); // Update the context
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setScreenSize('sm'); // Small screen
            else if (width < 1000) setScreenSize('md'); // Medium screen
            else setScreenSize('lg'); // Large screen
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            // Force navigation update after swiper initialization
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    });


    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className="relative h-full" role="region" aria-label="Case selection slider" aria-hidden="true">
                <Swiper
                    ref={swiperRef}
                    direction={'horizontal'}
                    // slidesPerView={5}
                    // spaceBetween={10}
                    mousewheel={{
                        forceToAxis: true
                    }}
                    navigation={{
                        nextEl: '#swiper-case-next',
                        prevEl: '#swiper-case-prev'
                    }}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: true
                    }}
                    modules={[Mousewheel, Navigation, Keyboard]}
                    className="mySwiper"
                    onReachBeginning={() => setIsBeginning(true)}
                    onFromEdge={() => {
                        setIsBeginning(false);
                        setIsEnd(false);
                    }}
                    onReachEnd={() => setIsEnd(true)}
                    onSlideChange={(swiper) => setActiveIndex('case', swiper.activeIndex)}
                    touchRatio={1} // Controls the sensitivity of touch gestures. Higher values increase responsiveness.
                    touchAngle={45} // Sets the swipe angle threshold.
                    threshold={10}
                    breakpoints={
                        {
                            500: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 20
                            },
                            1280: {
                                slidesPerView: 5,

                            },
                            1536: {
                                slidesPerView: 6,
                                spaceBetween: 10
                            }
                        }
                    }

                >
                    {screenSize === 'lg' && (
                        <>
                            <SwiperSlide key="extra-lg-start"></SwiperSlide>
                            <SwiperSlide key="extra-lg-start-2"></SwiperSlide>
                        </>
                    )}
                    {screenSize === 'md' && (
                        <>
                            <SwiperSlide key="extra-md-start"></SwiperSlide>
                        </>
                    )}
                    {(selectedOption === options[1] ? hermesData : selectedOption === options[2] ? seData : watchData).cases.map((item, index) => (
                        <SwiperSlide
                            key={item.id}
                            role="option"
                            aria-selected={activeIndexes.case === index}
                        >
                            <div
                                className={`relative h-[50vh] w-full z-10 cursor-pointer`}
                                onClick={() => handleSlideClick(index)}
                                tabIndex={0}
                                role="button"
                                aria-label={`Select case: ${item.bandName}`}
                                onKeyDown={(e) => e.key === 'Enter' && handleSlideClick(index)}
                            >
                                <Image
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none object-cover transition-opacity duration-700 delay-1000 ease-linear ${isSelectingCase ? "opacity-100" : "opacity-0"} xl:scale-100 lg:scale-95 scale-[.8]`}
                                    src={item?.watchFaceUrl}
                                    alt={item?.bandName}
                                    height={400}
                                    width={400}
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                    {screenSize === 'md' && (
                        <>
                            <SwiperSlide key="extra-md-end"></SwiperSlide>
                        </>
                    )}
                    {screenSize === 'lg' && (
                        <>
                            <SwiperSlide key="extra-lg-end"></SwiperSlide>
                            <SwiperSlide key="extra-lg-end-2"></SwiperSlide>
                        </>
                    )}
                </Swiper>
                {/* Navigation Arrows */}
                {!isEnd &&
                    <div id="swiper-case-next" className=" md:block hidden absolute z-[2] top-[40%] right-6 text-black bg-gray-200 p-0.5 rounded-full shadow-md cursor-pointer"
                        role="button"
                        aria-label="Next slide"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && swiperRef.current?.swiper?.slideNext()}>
                        <Image src={"/assets/icons/arrowRight.svg"} alt='left-icon' height={36} width={36} />
                    </div>
                }
                {!isBeginning &&
                    <div id="swiper-case-prev" className=" md:block hidden absolute z-[2] top-[40%] left-6 text-black bg-gray-200 p-0.5 rounded-full shadow-md cursor-pointer" role="button"
                        aria-label="Previous slide"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && swiperRef.current?.swiper?.slidePrev()}>
                        <Image src={"/assets/icons/arrowLeft.svg"} alt='right-icon' height={36} width={36} />
                    </div>
                }
                <Image
                    className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply z-0 object-cover xl:scale-100 lg:scale-95 scale-[.8] transition-opacity duration-500 ease-linear ${isSelectingCase ? "opacity-100" : "opacity-0"}`}
                    src={selectedOption === options[1] ? "/assets/images/hermes-series/bracelet.jpeg" : selectedOption === options[2] ? "/assets/images/special-edition/starFruit.jpeg" : "/assets/images/series-ten/bands/black.jpeg"}
                    alt={"Normal band"}
                    height={400}
                    width={400}

                />

            </div >
        </>
    )
}

export default CaseSlide