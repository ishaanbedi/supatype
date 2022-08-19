import React from 'react'

function InstCard (props) {
  return (
    <>
      <a className='block p-8 bg-[#395B64] border border-gray-800 shadow-xl rounded-xl'>
        {props.svg}
        <h3 className='mt-3 text-xl font-bold text-white'>{props.title}</h3>
        <p className='mt-4 text-sm text-gray-300'>
          {props.desc}
        </p>
      </a>

    </>
  )
}

export default InstCard
