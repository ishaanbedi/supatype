import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
function HeroSignedIn (props) {
  const [session, setSession] = useState(null)
  const [newUser, setNewUser] = useState(false)
  const [userName, setUserName] = useState('')
  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  useEffect(() => {
    getProfile()
  }, [session])
  async function getProfile () {
    try {
      const user = supabase.auth.user()
      const { data, error, status } = await supabase
        .from('SupaType_BackEnd')
        .select('*')
        .eq('id', user.id)
      if (Object.keys(data).length === 0) {
        setNewUser(true)
      } else {
        setUserName(data[0].username)
      }
    } catch (error) {
    }
  }
  function oldUserText (props) {
    return (
      <>
        <div className='relative max-w-screen-xl px-4 py-32 mx-auto h-screen items-center flex'>
          <div className='max-w-xl text-center sm:text-left'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 className='sm:text-3xl md:text-6xl lg:text-7xl text-2xl leading-tight font-extrabold text-[#E8F1F2]'>
                {props.signedIn === true ? "Let's type SupaFast ⚡️" : 'Can you type SupaFast?'}
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className='max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-[#E8F1F2]'>
                {props.signedIn === true ? `Welcome, @${userName}!` : 'With SupaType, you can take unlimited typing tests, for free ⚡️'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className='flex flex-row gap-4 mt-8 text-center'>
                <Link href={props.signedIn === true ? 'instructions' : 'profile'}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a className='block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring'>
                      {props.signedIn === true ? 'Start Typing' : 'Get Started'}
                    </a>
                  </motion.button>
                </Link>
                <Link href={props.signedIn === true ? 'profile' : 'https://www.github.com/ishaanbedi/supatype'}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a className='block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring'>
                      {props.signedIn === true ? 'Profile' : 'Source Code'}
                    </a>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }
  function newUserText (props) {
    return (
      <>
        <div className='relative max-w-screen-xl px-4 py-32 mx-auto h-screen items-center flex'>
          <div className='max-w-xl text-center sm:text-left'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 className='sm:text-3xl md:text-6xl lg:text-7xl text-2xl leading-tight font-extrabold text-[#E8F1F2]'>
                {props.signedIn === true ? "Let's type SupaFast ⚡️" : 'Can you type SupaFast?'}
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className='max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-[#E8F1F2]'>
                Before you can start taking tests, please setup a username from the <Link href='/profile'><span className='underline decoration-dotted underline-offset-4 cursor-pointer'>profile</span></Link> section!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className='flex flex-wrap gap-4 mt-8 text-center'>
                <Link href={props.signedIn === true ? 'profile' : ''}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a className='block w-full px-12 py-3 text-sm font-medium text-[#395B64] hover:text-[#2C3333] rounded shadow bg-[#D5DFE5] sm:w-auto focus:outline-none focus:ring'>
                      Profile
                    </a>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </>
    )
  }
  return (
    <section className='m-auto'>
      <Image
        src='/images/bg.png'
        alt='Typing on a keyboard'
        layout='fill'
      />
      <div className='hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-[#1B2430] sm:to-transparent' />
      {newUser ? newUserText(props) : oldUserText(props)}
    </section>
  )
}
function Hero (props) {
  return HeroSignedIn(props)
}
export default Hero
