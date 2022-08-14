import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import ProfileStatsCard from './ProfileStatsCard'
var userNameLocal = ""
export default function Account({ session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [average, setAverage] = useState(0)
    const [best, setBest] = useState(0)
    const [completed, setCompleted] = useState(0)
    useEffect(() => {
        getProfile()
    }, [session])
    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()
            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, avgSpeed, bestRecord, completedTests`)
                .eq('id', user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setUsername(data.username)
                setAverage(data.avgSpeed)
                setBest(data.bestRecord)
                setCompleted(data.completedTests)
                userNameLocal = data.username
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
    async function updateProfile({ username }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()
            const updates = {
                id: user.id,
                username,
                updated_at: new Date(),
            }
            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
            userNameLocal = username
        }
    }
    return (
        <section className='bg-[#1B2430] min-h-screen'>
            <div className="text-white ">
                <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-lg mx-auto text-center">
                        <h1 className='text-3xl font-bold sm:text-4xl my-4 text-[#D6D5A8] '>SupaProfile</h1>
                        <h2 className="text-2xl sm:text-3xl">@{userNameLocal}</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                        <ProfileStatsCard
                            title="Average Speed"
                            stat={`${average} WPM`}
                        />
                        <ProfileStatsCard
                            title="Best Record"
                            stat={`${best} WPM`}
                        />
                        <ProfileStatsCard
                            title="Completed Tests"
                            stat={`${completed}`}
                        />
                    </div>
                    <div className="mt-12 text-center">
                        <div className="form-widget">
                            <div className="relative my-4">
                                <label className="block text-xs font-medium text-[#D6D5A8]" htmlFor="email"> Email </label>
                                <input className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded  cursor-not-allowed text-black" value={session.user.email} id="email" type="email" />
                            </div>
                            <div className="relative my-4">
                                <label className="block text-xs font-medium text-[#D6D5A8]" htmlFor="username"> Display Name </label>
                                <input className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded text-black" id="email" type="email" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='my-4 space-x-4'>
                                <button
                                    className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#816797] rounded group focus:outline-none focus:ring"
                                    onClick={() => updateProfile({ username })}
                                >
                                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                                        {loading ? 'Loading ...' : 'Update Display Name'}
                                    </span>
                                </button>
                                <button
                                    className="relative inline-flex items-center px-8 py-3 overflow-hidden text-[#816797] border border-current rounded group active:text-indigo-500 focus:outline-none focus:ring" href="/download"
                                    onClick={() => supabase.auth.signOut()}
                                >
                                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                                        Sign Out
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section>
    )
}
