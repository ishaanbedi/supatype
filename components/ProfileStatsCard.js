import React from 'react'
import { motion } from 'framer-motion'
function ProfileStatsCard (props) {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
      >
        <a
          className='block p-8 cursor-default transition border bg-[#25303e] border-gray-800 shadow-xl rounded-xl hover:shadow-[#395B64] hover:border-[#395B64]'
        >
          <h3 className='mt-4 text-xl font-bold text-white'>{props.title}</h3>
          <p className='mt-1 text-sm text-gray-300'>
            {props.stat}
          </p>
        </a>
      </motion.button>
    </>
  )
}

export default ProfileStatsCard
