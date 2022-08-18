import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
function HeroSignedIn(props) {
    return (
        <section className="m-auto">
            <Image
                className=""
                src="/images/bg.png"
                alt="Typing on a keyboard"
                layout='fill'
            />
            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent"></div>

            <div className="relative max-w-screen-xl px-4 py-32 mx-auto h-screen items-center flex">
                <div className="max-w-xl text-center sm:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <h1 className="sm:text-3xl md:text-6xl lg:text-7xl text-2xl leading-tight font-extrabold text-[#E8F1F2]">
                            {props.signedIn === true ? "Let's type SupaFast ⚡️" : "Can you type SupaFast?"}
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >

                        <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-[#E8F1F2]">
                            {props.signedIn === true ? "Welcome! You are logged in." : "With SupaType, you can take unlimited typing tests, for free ⚡️"}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="flex flex-wrap gap-4 mt-8 text-center">
                            <Link href={props.signedIn === true ? "instructions" : "profile"}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <a className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                        {props.signedIn === true ? "Start Typing" : "Get Started"}
                                    </a>
                                </motion.button>
                            </Link>
                            <Link href={props.signedIn === true ? "profile" : "https://www.github.com/ishaanbedi/supatype"}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <a className="block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring">
                                        {props.signedIn === true ? "Profile" : "Source Code"}
                                    </a>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
function Hero(props) {
    return HeroSignedIn(props)
}
export default Hero