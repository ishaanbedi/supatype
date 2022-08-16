import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import InstCard from '../components/InstCard'
function Instructions() {
    return (
        <section className="text-white flex">
            <div className="lg:m-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">Before you start, </h2>

                    <p className="mt-4 text-gray-300">
                        Here are some instructions for your upcoming test. Please go through them carefully!
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 gap-8 mt-8 md:gap-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3"
                >
                    <InstCard
                        title="Time"
                        desc="There is no time limit to complete, however your final result highly depends on how much time you'll take. The less time you'll take, the better result you'll get."
                        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                    />
                    <InstCard
                        title="Words"
                        desc="You'll be presented with 15 random words that you'll have to type! The more accurately and fast you type these words, the better your result will be."
                        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>}
                    />
                    <InstCard
                        title="Result"
                        desc="Your progress will only be registered if you complete your test. Resetting in-between or leaving the test page will not count towards the leader-board."
                        svg={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>}
                    />
                </div>
                <div className="text-center">

                    <button className='text-center lg:mt-28 md:mt-20 mt-16'>
                        <Link href={'/type'}>
                            <a className="inline-block p-3 cursor-pointer bg-gray-900 border border-[#D6D5A8] rounded-full hover:bg-transparent text-shite hover:text-[#D6D5A8] active:text-[#9e9e85] focus:outline-none focus:ring">
                                <span className="sr-only"> Download </span>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </Link>
                    </button>
                </div>
            </div >
        </section >

    )
}



export default Instructions