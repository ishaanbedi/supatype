import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
function HeroSignedIn() {

    return (
        <section className="m-auto">
            <Image
                className=""
                src="/images/bg.png"
                alt="Typing on a keyboard"
                layout='fill'
            />
            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent"></div>
            <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                <div className="max-w-xl text-center sm:text-left">
                    <h1 className="sm:text-3xl md:text-6xl lg:text-7xl text-2xl leading-tight font-extrabold text-[#E8F1F2]">
                        Let&apos;s type {' '}
                        <strong className="font-extrabold sm:block">
                            SupaFast ⚡️
                        </strong>
                    </h1>
                    <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-white">
                        Welcome! You are logged in.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 text-center">
                        <Link href="/instructions">
                            <a className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                Start Typing
                            </a>
                        </Link>
                        <Link href="/profile" passHref>
                            <a className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                Profile
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
function HeroNotSignedIn() {
    return (
        <section className="m-auto">
            <Image
                className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
                src="/images/bg.png"
                alt="Typing on a keyboard"
                layout='fill'
            />
            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent"></div>
            <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                <div className="max-w-xl text-center sm:text-left">
                    <h1 className="sm:text-3xl md:text-6xl lg:text-7xl text-2xl leading-tight font-extrabold text-[#E8F1F2]">
                        Can you type{' '}
                        <strong className="font-extrabold sm:block">
                            SupaFast?
                        </strong>
                    </h1>
                    <p className="max-w-lg mt-6 sm:leading-relaxed sm:text-xl text-[#D5DFE5]">
                        With SupaType, you can take unlimited typing tests, for free ⚡️
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 text-center">
                        <Link href="/profile">
                            <a className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                Get Started
                            </a>
                        </Link>
                        <Link href="https://github.com/ishaanbedi/supatype" passHref>
                            <a target={'_blank'} className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                Source Code
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Hero(props) {
    if (props.signedIn === true) {
        return HeroSignedIn()
    }
    else {
        return HeroNotSignedIn()
    }
}

export default Hero