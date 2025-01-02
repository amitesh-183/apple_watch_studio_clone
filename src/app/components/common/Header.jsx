import Image from 'next/image'
import React from 'react'
import Dropdown from '../Dropdown'
import Link from 'next/link'
import SaveShare from '../SaveSahre'

const Header = ({ showWatch }) => {
    return (
        <>
            {/* logo Section */}
            <header className={`sm:px-8 px-4 bg-white md:py-0 py-4 flex ${!showWatch ? "justify-start" : "md:justify-between justify-center"} items-center gap-4`}
                role='banner'
                aria-label="Apple Watch Studio Header"
            >
                <Link href='/' aria-label="Go to Apple Watch homepage">
                    <Image src="/assets/images/watchLogo.jpeg" alt='apple-watch-logo' className='md:h-[90px] md:w-[80px] w-[70px] h-[20px] object-contain' width={90} height={100} />
                </Link >
                {
                    showWatch ?
                        (
                            <>
                                {/* dropdown */}
                                < div className='md:block hidden' >
                                    < Dropdown />
                                </div >
                                <div className='md:block hidden'>
                                    <SaveShare />
                                </div>
                                {/*                                 
                                <button className="appleBtn font-thin !px-4 text-sm tracking-wider md:block hidden" aria-label="Save the current configuration">Save</button> */}
                            </>
                        ) : ""
                }
            </header >
            {showWatch &&
                <div>
                    <div className='md:hidden flex justify-between px-4'>
                        {/* dropdown */}
                        < Dropdown />
                        <SaveShare />
                    </div>
                </div>
            }
        </>
    )
}

export default Header