'use client'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import watchData from '../../utils/data/BandData'
import hermesData from '../../utils/data/hermesData'


// import required modules
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import Image from 'next/image';
import useDropdown from '../context/Dropdown/useDropdown';
import { options } from '@/utils/shared/constants';
import seData from '@/utils/data/SpecialEditionData';
import { useActiveIndex } from '../context/ActiveIndex/ActiveIndexContext';
import Loading from './common/Loading';

const SizeSlide = ({ isSelectingSize }) => {
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

    useEffect(() => {
        if (swiperRef.current?.swiper && activeIndexes.size !== undefined) {
            swiperRef.current.swiper.slideTo(activeIndexes.size);
        }
    }, [activeIndexes.size]);

    const handleSlideClick = (index) => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
            setActiveIndex('size', index); // Update the context
        }
    };

    const getSizeData = () => {
        if (selectedOption === options[1]) return hermesData.sizes;
        if (selectedOption === options[2]) return seData.sizes;
        return watchData.sizes;
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

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className="relative h-full" role='region' aria-label='size-slide'>
                <Swiper
                    ref={swiperRef}
                    direction={'horizontal'}
                    // slidesPerView={5}
                    // spaceBetween={10}
                    mousewheel={{
                        forceToAxis: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
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
                    onSlideChange={(swiper) => setActiveIndex('size', swiper.activeIndex)}
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
                    {getSizeData().map((item, index) => (
                        <SwiperSlide
                            key={item.id}
                        >
                            <div
                                className={`relative h-[50vh] w-full z-10 cursor-pointer`}
                                onClick={() => handleSlideClick(index)}
                            >
                                <Image
                                    className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply z-0 object-cover transition-opacity duration-500 ease-linear ${isSelectingSize ? "opacity-100" : "opacity-0"} ${item.size === 42 || item.size === 40 ? "lg:scale-90 scale-75" : "lg:scale-100 scale-[.8]"}`}
                                    src={item?.bandUrl}
                                    alt={"Normal band"}
                                    height={420}
                                    width={420}
                                />
                                <Image
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none object-cover transition-opacity duration-700 delay-1000 ease-linear ${isSelectingSize ? "opacity-100" : "opacity-0"} ${item.size === 42 || item.size === 40 ? "lg:scale-90 scale-75" : "lg:scale-100 scale-[.8]"}`}
                                    src={item.watchFaceUrl}
                                    alt={"normal Watch"}
                                    height={420}
                                    width={420}
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
                    <div className="swiper-button-next md:block hidden absolute z-[2] top-[40%] right-6 text-black bg-gray-200 p-0.5 rounded-full shadow-md cursor-pointer">
                        <Image src={"/assets/icons/arrowRight.svg"} alt='-icon' height={36} width={36} />
                    </div>
                }
                {!isBeginning &&
                    <div className="swiper-button-prev md:block hidden absolute z-[2] top-[40%] left-6 text-black bg-gray-200 p-0.5 rounded-full shadow-md cursor-pointer">
                        <Image src={"/assets/icons/arrowLeft.svg"} alt='-icon' height={36} width={36} />
                    </div>
                }
            </div>
        </>
    )
}

export default SizeSlide