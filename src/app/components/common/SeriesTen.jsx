import Image from 'next/image'
import React from 'react'

const SeriesTen = ({ showWatch, isSideViewVisible }) => {
    return (
        <>
            <div
                className={`relative transition-all duration-1000 ease-linear ${showWatch ? "md:h-[50vh] h-[52vh]" : "xl:h-[50vh] md:h-[40vh] h-[15vh] mt-36"
                    } w-full pointer-events-none`}
                role="region"
                aria-label="Series Ten Watch Display"
            >
                {/* Side View */}
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-linear ${isSideViewVisible ? 'opacity-100 block' : 'opacity-0 hidden'
                        } ${showWatch ? 'md:scale-100 scale-90' : ''} z-0 mix-blend-multiply`}
                    alt="watch-band"
                    src="/assets/images/series-ten/blackSoloSide.jpeg"
                    height={380}
                    width={380}
                    aria-hidden={!isSideViewVisible}
                />

                {/* Start Screen */}
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-linear duration-1000 ${showWatch ? "" : "xl:scale-110 xl:max-w-[800px] md:max-w-[460px] max-w-[320px] w-full scale-[1.6]"
                        } ${isSideViewVisible ? 'opacity-0 invisible' : 'opacity-100 visible'
                        } mix-blend-multiply z-0`}
                    alt='watch-band'
                    src="/assets/images/series-ten/bands/homeScreenBlackStrap.jpeg"
                    height={400}
                    width={400}
                    aria-hidden={isSideViewVisible}
                />
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear ${showWatch ? "" : "xl:scale-110 xl:max-w-[800px] md:max-w-[460px] max-w-[320px] w-full scale-[1.6]"
                        } ${isSideViewVisible ? 'opacity-0 invisible ease-linear' : 'opacity-100 visible'
                        } z-0`}
                    alt='watch-face'
                    src="/assets/images/series-ten/homeScreenWatch.png"
                    height={400}
                    width={400}
                    aria-hidden={isSideViewVisible}
                />
            </div>
        </>
    )
}

export default SeriesTen