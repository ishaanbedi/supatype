/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
function Word(props) {
    const { text, active, correct } = props
    if (correct === true) {
        return <span className="correct font-bold  text-green-400 line-through">{text} </span>
    }
    if (correct === false) {
        return <span className="incorrect font-bold text-red-400 line-through">{text} </span>
    }
    if (active) {
        return <span className="font-bold active underline underline-offset-4">{text} </span>
    }
    return <span>{text} </span>
    Word = React.memo(Word)
}
export default Word