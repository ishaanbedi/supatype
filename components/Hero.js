import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
function HeroSignedIn() {

    return (
        <section className="m-auto">
            <Image
                className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
                src="https://images.unsplash.com/photo-1616004667892-d348f7349d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="Typing on a keyboard"
                layout='fill'
            />
            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent"></div>
            <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                <div className="max-w-xl text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                        Let&apos;s type{' '}
                        <strong className="font-extrabold text-[#D6D5A8] sm:block">
                            SupaFast!
                        </strong>
                    </h1>
                    <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-white">
                        Welcome! You are logged in.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 text-center">
                        <Link href="/type">
                            <a className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-[#816797] sm:w-auto focus:outline-none focus:ring">
                                Start Typing
                            </a>
                        </Link>
                        <Link href="/leaderboard" passHref>
                            <a className="w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-[#816797] sm:w-auto focus:outline-none focus:ring">
                                Leaderboard
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
                src="https://images.unsplash.com/photo-1616004667892-d348f7349d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="Typing on a keyboard"
                layout='fill'
            />
            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent"></div>
            <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                <div className="max-w-xl text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                        Can you type{' '}
                        <strong className="font-extrabold text-[#D6D5A8] sm:block">
                            SupaFast?
                        </strong>
                    </h1>
                    <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-white">
                        With SupaType, you can take typing tests online for free...
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 text-center">
                        <Link href="/profile">
                            <a className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-[#816797] sm:w-auto focus:outline-none focus:ring">
                                Get Started
                            </a>
                        </Link>
                        <Link href="https://github.com/ishaanbedi/supatype" passHref>
                            <a className="w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-[#816797] sm:w-auto focus:outline-none focus:ring cursor-ne-resize" target={"_blank"}>
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