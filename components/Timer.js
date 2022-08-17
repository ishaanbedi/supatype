/* eslint-disable react-hooks/rules-of-hooks */

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
            <p><span className="font-bold">Time:</span> <span className="timeSpan">{timeElapsed}</span> seconds</p>
            <p><span className="font-bold">Speed:</span> <span className="scoreSpan">{((correctWords / minutes) || 0).toFixed(2)}</span> WPM</p>
        </>
    )
}

export default Timer