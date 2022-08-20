/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from 'react'
function Timer (props) {
  const { correctWords, startCounting } = props
  const [timePassed, setTimePassed] = useState(0)
  useEffect(() => {
    let info
    if (startCounting) {
      info = setInterval(() => {
        setTimePassed(e => e + 1)
      }, 1000)
    }
    return () => { clearInterval(info) }
  }, [startCounting])
  const minutes = (timePassed / 60)
  return (
    <>
      <div>
        <p className={minutes === 0 ? 'invisible' : ''}><span className='font-bold'>Time:</span> <span className='timeSpan'>{timePassed}</span> seconds</p>
        <p className={minutes === 0 ? 'invisible' : ''}><span className='font-bold'>Speed:</span> <span className='scoreSpan'>{((correctWords / (minutes)) || 0).toFixed(2)} WPM</span></p>
      </div>
    </>
  )
}
export default Timer
