/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head"
import React, { useRef, useState, useEffect } from "react"
function Word(props) {
    const { text, active, correct } = props
    if (correct === true) {
        return <span className="correct font-bold text-green-400">{text} </span>
    }
    if (correct === false) {
        return <span className="incorrect font-bold text-red-400">{text} </span>
    }
    if (active) {
        return <span className="font-bold active">{text} </span>
    }
    return <span>{text} </span>
    Word = React.memo(Word)
}
export default Word