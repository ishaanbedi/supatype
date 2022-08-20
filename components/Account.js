import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import ProfileStatsCard from './ProfileStatsCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { motion } from 'framer-motion'
let userNameLocal = ''
let scoresArrayLocal = []
let errorGot = false
export default function Account ({ session }) {
  const data = {
    labels: scoresArrayLocal.map((e, i) => { return i + 1 }),
    datasets: [
      {
        label: 'Progress',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#1B2430',
        borderColor: '#395B64',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#E8F1F2',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#E8F1F2',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: scoresArrayLocal
      }
    ]
  }
  const notifySuccess = () => toast.success('Display name updated!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
  const notifyError = () => toast.error('Display name already taken. Try again!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [activateButton, setActivateButton] = useState(false)
  const [best, setBest] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  useEffect(() => {
    getProfile()
  }, [session])
  async function getProfile () {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const { data, error, status } = await supabase
        .from('SupaType_BackEnd')
        .select('username, bestRecord, completedTests, totalScore, scoresArray')
        .eq('id', user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setUsername(data.username)
        setBest(data.scoresArray.reduce((a, b) => a > b ? a : b, 0))
        setCompleted(data.completedTests)
        setTotalScore(data.totalScore)
        userNameLocal = data.username
        scoresArrayLocal = data.scoresArray
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  async function updateProfile ({ username }) {
    username = username.toLowerCase()
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const updates = {
        id: user.id,
        username,
        updated_at: new Date()
      }
      const { error } = await supabase.from('SupaType_BackEnd').upsert(updates, {
        returning: 'minimal'
      })
      if (error) {
        errorGot = true
        if (errorGot) {
          notifyError()
        }
      } else {
        errorGot = false
        notifySuccess()
      }
    } catch (error) {

    } finally {
      setLoading(false)
      getProfile()
      setActivateButton(false)
    }
  }
  return (
    <section className='bg-[#1B2430] min-h-screen'>
      <div className='text-[#E8F1F2] '>
        <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
          <div className='max-w-lg mx-auto text-center'>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className='cursor-default text-3xl font-bold sm:text-4xl my-6 text-[#E8F1F2] '>SupaProfile</h1>
            </motion.button>
            {userNameLocal !== '' ? <h2 className='text-2xl sm:text-3xl bg-[#395B64]/50 font-bold py-8 rounded-md'>@{userNameLocal}</h2> : <h2>Register a username from below!</h2>}
          </div>
          <div className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3'>
            <ProfileStatsCard
              title='Average Speed'
              stat={`${((totalScore / completed) || 0).toFixed(2)} WPM`}
            />
            <ProfileStatsCard
              title='Best Record'
              stat={`${best} WPM`}
            />
            <ProfileStatsCard
              title='Completed Tests'
              stat={`${completed}`}
            />
          </div>
          <div className={scoresArrayLocal.length >= 3 ? 'chart text-center flex flex-col items-center py-12' : 'hidden'}>
            <h1 className='text-2xl font-bold my-4'>Your progress so far!</h1>
            <div className='h-96 lg:w-96 md:w-96  w-full'>
              <Line
                data={data}
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className='mt-12 '>
            <p className={scoresArrayLocal.length >= 3 ? 'hidden' : 'text-center'}><span className={userNameLocal !== username ? 'hidden' : ''}>{userNameLocal !== username ? '' : 'Complete at least 3 typing tests to unlock visualizations of your progress! '}</span></p>
            <div className='form-widget text-center'>
              <h1 className='text-2xl font-bold my-4 mt-8 underline underline-offset-8 decoration-dotted'>Your Information</h1>
              <div className='relative'>
                <label className='block text-lg font-bold text-[#E8F1F2]' htmlFor='email'> Email</label>
                <input className='mt-2 text-center border-none text-[#E8F1F2]  p-3 text-sm border-2 border-gray-200 rounded  cursor-not-allowed bg-[#395B64]/50' readOnly value={session.user.email} id='email' type='email' />
              </div>
              <div className='relative my-4 mt-8'>
                <label className='block text-lg font-bold text-[#E8F1F2]' htmlFor='username'> Username </label>
                <input className='mt-2 text-center border-none text-[#E8F1F2]  p-3 text-sm border-2 border-gray-200 rounded bg-[#395B64]/50' id='username' type='username' value={username || ''} onChange={(e) => { setUsername(e.target.value.replace(/\s/g, '')), setActivateButton(true) }} />
              </div>
              <button
                className={activateButton ? 'relative inline-flex items-center px-8 py-1 overflow-hidden text-[#395B64] hover:text-[#2C3333] bg-[#D5DFE5] rounded group focus:outline-none focus:ring' : 'hidden'}
                onClick={() => updateProfile({ username })}
              >
                <span className='absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4'>
                  <svg className='w-5 h-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </span>
                <span className='text-sm font-medium transition-all group-hover:mr-4'>
                  {loading ? 'Loading ...' : 'Update'}
                </span>
              </button>
              <div className='my-4 mt-12 space-x-4'>
                <Link href='/'>
                  <button
                    className='relative inline-flex items-center px-8 py-3 mt-2 overflow-hidden text-[#E8F1F2] border border-current rounded group active:text-[#D5DFE5] focus:outline-none focus:ring' href='/download'
                    onClick={() => supabase.auth.signOut()}
                  >
                    <span className='absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                          </svg>
                      </span>
                    <span className='text-sm font-medium transition-all group-hover:mr-4'>
                        Sign Out
                                        </span>
                  </button>
                </Link>
                <Link href='/'>
                  <button
                    className='relative inline-flex items-center px-8 py-3 mt-2 overflow-hidden text-[#E8F1F2] border border-current rounded group active:text-[#] focus:outline-none focus:ring' href='/download'
                  >
                    <span className='absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                          </svg>
                      </span>
                    <span className='text-sm font-medium transition-all group-hover:mr-4'>
                        Home
                                        </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  )
}
