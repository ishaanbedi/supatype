/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head"
import React, { useRef, useState, useEffect } from "react"

function Timer(props) {
    const { correctWords, startCounting } = props
    const [timeElapsed, setTimeElapsed] = useState(0);
    useEffect(() => {
        let id
        if (startCounting) {
            id = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1)
            }, 1000)
        }
        return () => { clearInterval(id) }
    }, [startCounting])
    const minutes = (timeElapsed / 60)
    return (
        <>
            <p><span className="font-bold">Time:</span> {timeElapsed} seconds</p>
            <p><span className="font-bold">Speed:</span> {((correctWords / minutes) || 0).toFixed(2)} WPM</p>
        </>
    )
}

export default Timer