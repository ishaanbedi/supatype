/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getWords } from "../utils/words"
import Timer from '../components/Timer'
import Word from '../components/Word'
import NotSignedIn from '../components/NotSignedIn'
import { supabase } from '../utils/supabaseClient'
import Confetti from 'react-confetti'


function startTypeSignedIn() {

    const [showModal, setShowModal] = useState(false);
    const [zeroSpeed, setZeroSpeed] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [testEnded, setTestEnded] = useState(false);
    const [session, setSession] = useState(null)
    const [runConfetti, setRunConfetti] = useState(false)
    var notZeroMsg = () => {
        return (
            <>
                You took <span className="underline underline-offset-4 font-bold">{document.querySelector('.timeSpan').innerHTML} seconds</span> to complete the test!
                <br />
                Your speed for the test was <span className="underline underline-offset-4 font-bold">{document.querySelector('.scoreSpan').innerHTML}</span>.
            </>
        )
    }
    var ZeroMsg = () => {
        return (
            <>
                You did not completed the test successfully! Please try again!
            </>
        )
    }
    async function updateProfile() {
        if ((parseInt(document.querySelector('.scoreSpan').innerHTML)) <= 1) {
            setZeroSpeed(true)
            return
        }
        setRunConfetti(!zeroSpeed)
        var completedTestsLocal;
        var bestRecordLocal;
        var totalScoreLocal;
        var scoresArrayLocal = [];

        try {

            const user = supabase.auth.user()
            let { data, error, status } = await supabase
                .from('SupaType_BackEnd')
                .select(`username, totalScore, bestRecord, completedTests, scoresArray`)
                .eq('id', user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                totalScoreLocal = data.totalScore
                bestRecordLocal = data.bestRecord
                completedTestsLocal = data.completedTests
                scoresArrayLocal = data.scoresArray

            }
        } catch (error) {
        } finally {

        }
        try {
            const user = supabase.auth.user()
            scoresArrayLocal.push(parseInt(document.querySelector('.scoreSpan').innerHTML))
            if (bestRecordLocal < document.querySelector('.scoreSpan').innerHTML) {
                bestRecordLocal = document.querySelector('.scoreSpan').innerHTML;
            }
            const updates = {
                id: user.id,
                totalScore: (totalScoreLocal + parseInt(document.querySelector('.scoreSpan').innerHTML)),
                completedTests: (completedTestsLocal + 1),
                bestRecord: scoresArrayLocal.reduce((a, b) => a > b ? a : b, 0),
                scoresArray: scoresArrayLocal,
                updated_at: new Date(),
            }
            let { error } = await supabase.from('SupaType_BackEnd').upsert(updates, {
                returning: 'minimal'
            })

            if (error) {
                error
            }
        } catch (error) {
            console.log(error.message)
        } finally {

        }
    }

    const router = useRouter()

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    const [startCounting, setStartCounting] = useState(false);
    const [userInput, setUserInput] = useState("");
    const wordsObj = useRef(getWords())
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [correctWordArray, setCorrectWordArray] = useState([]);
    var processInput = (value) => {
        setTestStarted(true)
        if (activeWordIndex === wordsObj.current.length) {
            return
        }
        if (!startCounting) {
            setStartCounting(true)
        }
        if (value.endsWith(" ") || value === wordsObj.current[wordsObj.current.length - 1]) {
            if (activeWordIndex === wordsObj.current.length - 1) {
                setTimeout(() => {
                    setStartCounting(false)
                    setUserInput("Test Completed")
                    setTestEnded(true)
                    setShowModal(true)
                }, 300);
                updateProfile();
            }
            else {
                setUserInput('')
            }
            setActiveWordIndex(index => index + 1)
            setCorrectWordArray(data => {
                const word = value.trim()
                const newResult = [...data]
                newResult[activeWordIndex] = word === wordsObj.current[activeWordIndex]
                return newResult
            })
        }
        else {
            setUserInput(value)
        }
    }
    return (
        <>
            <Head>
                <title>New Typing Session : SupaType ⚡️</title>
            </Head>
            <Confetti
                run={runConfetti}
                numberOfPieces={500}
                recycle={false}
                colors={['#395B64', '#E8F1F2']}
            />
            <section className={testEnded ? 'min-h-screen md:block bg-[#1B2430] blur-sm brightness-150 ' : 'min-h-screen md:block bg-[#1B2430]'}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h1 className="text-[#D5DFE5] text-center text-4xl font-bold py-12">SupaType ⚡️</h1>
                </motion.div>
                <div className="px-12 my-4">
                    <h1 className="text-[#D5DFE5] text-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Timer
                                startCounting={startCounting}
                                correctWords={correctWordArray.filter(Boolean).length}
                            />
                        </motion.div>
                    </h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className="word-ribbon-bar bg-[#395B64]/50 rounded-lg lg:text-3xl md:text-2xl sm:text-lg text-xl  my-8 mb-8 text-center">
                            <p className="text-[#D5DFE5] py-8">
                                {wordsObj.current.map((word, index) => {
                                    return <Word
                                        text={word}
                                        key={index}
                                        active={index === activeWordIndex}
                                        correct={correctWordArray[index]}
                                    />
                                })}
                            </p>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="word-ribbon-input text-center w-full px-12">
                        <div className="relative">
                            <input
                                disabled={testEnded}
                                className=" py-3 mt-12 text-lg focus:outline-dotted  text-center text-[#D5DFE5] rounded bg-[#395B64]/50 border-none	active:border-b-2	"
                                type="text"
                                placeholder={testStarted ? " " : "Click here to start typing"}
                                value={userInput}
                                onChange={(e) => processInput(e.target.value)}
                            />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className='my-4 mt-12 space-x-4 text-center'>
                        <button className="relative inline-flex items-center px-8 py-3 overflow-hidden text-[#D5DFE5] bg-[#395B64] rounded group  focus:outline-none focus:ring"
                            onClick={() => { router.reload(window.location.pathname) }}
                        >
                            <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:mr-4">
                                Restart
                            </span>
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link href='/'>
                                <span
                                    className="relative inline-flex items-center px-8 py-3 mt-2 overflow-hidden text-[#D5DFE5] border border-current rounded group  active:text-[#D5DFE5] focus:outline-none focus:ring"
                                >
                                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                                        Home
                                    </span>
                                </span>
                            </Link>
                        </motion.button>
                    </div>
                </motion.div>
            </section>
            <>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#395B64] outline-none focus:outline-none">

                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold text-[#E8F1F2]">
                                            {!zeroSpeed ? "Test Completed!" : "Oops!"}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-gray-200 text-lg leading-relaxed">
                                            {!zeroSpeed ? "Well done!" : "That's not we expected!"}
                                            <br />
                                            {!zeroSpeed ? notZeroMsg() : ZeroMsg()}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <Link href='/profile'>
                                            <button
                                                className="text-[#D5DFE5] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >

                                                <a className="relative inline-flex items-center px-8 py-3 overflow-hidden text-[#395B64] bg-[#D5DFE5] rounded group focus:outline-none focus:ring">
                                                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </span>

                                                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                                                        Profile
                                                    </span>
                                                </a>
                                            </button>
                                        </Link>
                                        <button
                                            className="text-[#D5DFE5] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { setShowModal(false); setTestEnded(false) }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
        </>
    )
}

function Type(props) {
    if (props.signedIn === true) {
        return startTypeSignedIn()
    }
    else {
        return NotSignedIn()
    }
}
export default Type