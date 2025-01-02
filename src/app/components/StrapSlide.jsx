'use client'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import watchData from '../../utils/data/BandData'
import hermesData from '../../utils/data/hermesData'
import seData from '../../utils/data/SpecialEditionData'


// import required modules
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import Image from 'next/image';
import useDropdown from '../context/Dropdown/useDropdown';
import { options } from '@/utils/shared/constants';
import { useActiveIndex } from '../context/ActiveIndex/ActiveIndexContext';
import Loading from './common/loading';

const StrapSlide = ({ isSelectingStrap }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [screenSize, setScreenSize] = useState('lg');
    const [isLoading, setIsLoading] = useState(true);
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
        if (swiperRef.current?.swiper && activeIndexes.strap !== undefined) {
            swiperRef.current.swiper.slideTo(activeIndexes.strap);
        }
    }, [activeIndexes.strap]);

    const handleSlideClick = (index) => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
            setActiveIndex('strap', index); // Update the context
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setScreenSize('sm'); // Small screen
            else if (width < 1000) setScreenSize('md'); // Medium screen
            // else if (width > 1000) setScreenSize('lg'); // Medium screen
            else setScreenSize('lg'); // Large screen
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const data = selectedOption === options[1] ? hermesData : selectedOption === options[2] ? seData : watchData;

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className="relative h-full" role='region' aria-label='strap-slide'>
                <Swiper
                    ref={swiperRef}
                    direction={'horizontal'}
                    // slidesPerView={5}
                    // spaceBetween={10}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.2,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-band-next',
                        prevEl: '.swiper-button-band-prev'
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
                                spaceBetween: 10
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
                    onReachEnd={() => setIsEnd(true)}
                    onSlideChange={(swiper) => setActiveIndex('strap', swiper.activeIndex)}

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
                    {data.bands.map((item, index) => (
                        <SwiperSlide
                            key={item.id}
                            role='listItem'
                            aria-label={`strap ${index}`}
                        >
                            <div
                                className={`relative h-[50vh] w-full z-10 cursor-pointer`}
                                onClick={() => handleSlideClick(index)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSlideClick(index)}
                                role='button'
                                tabIndex={0}
                                aria-pressed={activeIndexes.strap === index}
                            >
                                <Image
                                    className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply z-0 object-cover transition-opacity duration-500 ease-linear lg:scale-95 md:scale-90 scale-[.8] ${isSelectingStrap ? "opacity-100" : "opacity-0"}`}
                                    src={item.bandUrl}
                                    alt={item.bandName || 'strap-image'}
                                    height={360}
                                    width={200}
                                    quality={100}
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
                {!isBeginning &&
                    <div className="swiper-button-band-prev md:block hidden absolute z-[6] top-[40%] left-6 text-black p-0.5 bg-gray-200 rounded-full cursor-pointer"
                        role='button'
                        aria-label='previous'
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && swiperRef.current.swiper.slidePrev()}
                    >
                        <Image src={"/assets/icons/arrowLeft.svg"} alt='left-icon' className="" height={36} width={36} />
                    </div>
                }
                {!isEnd &&
                    <div className="swiper-button-band-next md:block hidden absolute z-[6] top-[40%] right-6 text-black p-0.5 bg-gray-200 rounded-full cursor-pointer" role='button' aria-label='next' tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && swiperRef.current.swiper.slideNext()}>
                        <Image src={"/assets/icons/arrowRight.svg"} alt='right-icon' className="" height={36} width={36} />
                    </div>
                }
                {data.bands[activeIndexes.strap] && (
                    < Image
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none  transition-opacity duration-700 delay-1000 ease-linear md:scale-90 lg:max-w-[419px] md:max-w-[410px] max-w-[290px] w-full  scale-110 ${isSelectingStrap ? "opacity-100" : "opacity-0"}`}
                        src={data.bands[activeIndexes.strap].watchFaceUrl}
                        alt={data.bands[activeIndexes.strap].bandName || 'band-image'}
                        height={420}
                        width={420}
                    />
                )}
            </div >
        </>
    )
}

export default StrapSlide