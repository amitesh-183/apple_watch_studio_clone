import Image from 'next/image';
import React from 'react';

const HermesSeries = ({ showWatch, isSideViewVisible }) => {
    return (
        <>
            <div
                className={`relative transition-all duration-1000 ease-linear ${showWatch ? 'h-[50vh]' : 'h-[50vh] mt-36'
                    } w-full pointer-events-none`}
                role="region"
                aria-label="Hermes Series Watch Display"
            >
                {/* Side View */}
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-linear ${isSideViewVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                        } ${showWatch ? '' : 'scale-110'} z-0 mix-blend-multiply`}
                    alt="watch-band"
                    src="/assets/images/hermes-series/side-view.jpeg"
                    height={showWatch ? 380 : 800}
                    width={showWatch ? 380 : 800}
                    aria-hidden={!isSideViewVisible}
                />

                {/* Bracelet Image */}
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${isSideViewVisible ? 'opacity-0 invisible' : 'opacity-100 visible'
                        } ${showWatch ? '' : 'scale-110'} mix-blend-multiply z-0`}
                    alt="watch-bracelet"
                    src="/assets/images/hermes-series/bracelet.jpeg"
                    height={showWatch ? 380 : 800}
                    width={showWatch ? 380 : 800}
                    aria-hidden={isSideViewVisible}
                />

                {/* Watch Face */}
                <Image
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${isSideViewVisible ? 'opacity-0 invisible' : 'opacity-100 visible'
                        } ${showWatch ? '' : 'scale-110'} z-0`}
                    alt="watch-face"
                    src="/assets/images/hermes-series/face.png"
                    height={showWatch ? 380 : 800}
                    width={showWatch ? 380 : 800}
                    aria-hidden={isSideViewVisible}
                />
            </div>
        </>
    );
};

export default HermesSeries;